const express = require('express');
const router = express.Router();
const Product = require('../../models/product');

// INDEX - GET all products
router.get('/', async (req, res) => {
  Product.find({}, (err, products) => {
    if(err){
        console.log(err);
        res.redirect('/');
    } else {
       res.render('pages/admin/products',{ products });
    }
  });
});

// NEW - GET to show view for adding new product
router.get('/new', async (req, res) => {
  res.send('pages/admin/products/new');
});

// CREATE - add new product to DB
router.post('/', (req, res) => {
  const { title, price, image } = req.body;
  const newProduct = { title, price, image };
  Product.create(newProduct, (err, createdProduct) => {
      if(err) {
          console.log(err);
      } else {
          res.redirect('/admin/products/');
      }
  });
});

// EDIT - GET to show view for editing a product
router.get('/:id/edit', async (req, res) => {
  Product.findById(req.params.id, (err, foundProduct) => {
      if(err) {
          console.log(err);
          res.redirect('/admin/products/');
      } else {
          res.render('pages/admin/edit', { product: foundProduct });
      }
  });
});

// UPDATE - update some product
router.put('/:id', (req, res) => {
  Product.findByIdAndUpdate(req.params.id, req.body.product, (err, updatedProduct) => {
      if(err) {
          console.log(err);
          res.redirect('/admin/products/');
      } else {
          res.redirect('/admin/products/' + req.params.id);
      }
  });
});

// DELETE the product with received id
router.delete('/:id', async (req, res) => {
  res.send("Implementar tratamento para deletar produto");
});

module.exports = router;