const express = require('express');
const router = express.Router();
const Product = require('../models/product');

// INDEX - GET all products
router.get('/', (req, res) => {
  Product.find({}, (err, products) => {
    if(err){
      console.log(err);
      res.redirect('/');
    } else {
      res.render('pages/products/index', { products });
    }
  });
});

// NEW - GET to show view for adding new product
router.get('/new', (req, res) => {
  res.render('pages/products/new');
});

// CREATE - add new product to DB
router.post('/', (req, res) => {
  const { title, price, image, description } = req.body;
  const newProduct = { title, price, description };
  if(image.replace(/\s+/g,'') !== '') { newProduct.image = image };
  Product.create(newProduct, (err, createdProduct) => {
    if(err) {
      console.log(err);
    }
    res.redirect('/products/' + createdProduct.id);
  });
});

// EDIT - GET to show view for editing a product
router.get('/:id/edit', (req, res) => {
  Product.findById(req.params.id, (err, foundProduct) => {
    res.render('pages/products/edit', { product: foundProduct });
  });
});

// UPDATE - update some product
router.put('/:id', (req, res) => {
  const { title, price, image, description } = req.body;
  const product = { title, price, description };
  if(image.replace(/\s+/g,'') !== '') { product.image = image };
  Product.findByIdAndUpdate(req.params.id, product, (err, updatedProduct) => {
    if(err) {
      console.log(err);
    } 
    res.redirect('/products/' + updatedProduct.id);
  });
});

// DELETE the product with received id
router.delete('/:id', (req, res) => {
  Product.findByIdAndRemove(req.params.id, (err) => {
    if(err) {
      console.log(err);
    } 
    res.redirect('/products/');
  });
});

// SHOW - shows more info about one product
router.get("/:id", (req, res) => {
  Product.findById(req.params.id, (err, foundProduct) => {
    res.render('pages/products/show', { product: foundProduct });
  });
});

module.exports = router;