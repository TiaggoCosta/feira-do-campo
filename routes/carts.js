const express = require('express');
const cartsRepo = require('../models/cart');
const productsRepo = require('../models/product');
//const cartShowTemplate = require('../views/carts/show');

const router = express.Router();

// Receive a post request to add an item to a cart
router.post('/products', async (req, res) => {
  // Figure out the cart!
  let cart;
  if (!req.session.cartId) {
    // We dont have a cart, we need to create one,
    // and store the cart id on the req.session.cartId
    // property
    cart = await cartsRepo.create( { items: [] } );
    req.session.cartId = cart.id;
  } else {
    // We have a cart! Lets get it from the repository
    cart = await cartsRepo.findById(req.session.cartId);
  }

  const existingItem = cart.items.find(item => item.productId === req.body.productId);
  if (existingItem) {
    // increment quantity and save cart
    existingItem.quantity++;
  } else {
    // add new product id to items array
    cart.items.push({ productId: req.body.productId, quantity: 1 });
  }
  cart.save();

  res.redirect('/');
});

// Receive a GET request to show all items in cart
router.get('/', async (req, res) => {
  if (!req.session.cartId) {
    return res.redirect('/');
  }

  const cart = await cartsRepo.findById(req.session.cartId);
  let products = [];
  
  for (let item of cart.items) {
    let foundProduct = await productsRepo.findById(item.productId);
    let { id, title, price, image } = foundProduct;
    let product = { id, title, price, image };
    product.quantity = item.quantity;
    products.push(product);
  }
  
  res.render('pages/carts/show', { products, cart });
  
});

// Receive a post request to delete an item from a cart
router.delete('/products/:id', async (req, res) => {
  
  await cartsRepo.findByIdAndUpdate(
    req.session.cartId, { 
      $pull: { "items": { productId: req.params.id } } 
    }, { safe: true, upsert: true }
  );
    
  res.redirect('/cart');
});

module.exports = router;
