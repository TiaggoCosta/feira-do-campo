const express = require('express');
const router = express.Router();
const Product = require('../../models/product');

//GET all products
router.get('/', async (req, res) => {
  Product.find({}, (err, products) => {
    if(err){
        console.log(err);
    } else {
       res.render('pages/admin/products',{ products });
    }
  });
});

//GET to show view for adding new product
router.get('/new', async (req, res) => {
  res.send("Implementar tratamento para adicionar novo produto");
});

//GET to show view for editing a product
router.get('/:id/edit', async (req, res) => {
  res.send("Implementar tratamento para editar produto");
});

//DELETE the product with received id
router.delete('/:id', async (req, res) => {
  res.send("Implementar tratamento para deletar produto");
});

module.exports = router;