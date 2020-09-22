const express = require('express');
const router = express.Router();
const Product = require('../../models/product');

// INDEX - GET all products
router.get('/', async (req, res) => {
  Product.find({}, (err, products) => {
    if(err){
        console.log(err);
    } else {
       res.render('pages/admin/products',{ products });
    }
  });
});

// NEW - GET to show view for adding new product
router.get('/new', async (req, res) => {
  res.send("Implementar tratamento para adicionar novo produto");
});

// CREATE - add new product to DB

// SHOW - shows more info about one product

// EDIT - GET to show view for editing a product
router.get('/:id/edit', async (req, res) => {
  Product.findById(req.params.id, (err, foundProduct) => {
      if(err) {
          console.log(err);
          res.redirect('/');
      } else {
          res.render('pages/admin/edit', { product: foundProduct });
      }
  });
});

// UPDATE - update some product

// DELETE the product with received id
router.delete('/:id', async (req, res) => {
  res.send("Implementar tratamento para deletar produto");
});

module.exports = router;