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

  res.redirect('/cart');
});

// Receive a GET request to show all items in cart
router.get('/', async (req, res) => {
  if (!req.session.cartId) {
    return res.redirect('/');
  }

  const cart = await cartsRepo.findById(req.session.cartId);

  res.render('pages/carts/show', { cart });
});

module.exports = router;
