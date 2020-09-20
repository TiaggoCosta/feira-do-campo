const express = require('express');

const router = express.Router();

//GET all products
router.get('/', async (req, res) => {
  var products = [{
    id: 1234,
    name: "Tomate",
    price: 2.90
  }, {
    id: 4321,
    name: "Bergamota",
    price: 1.99
  }, {
    id: 5678,
    name: "Laranja",
    price: 3
  }];

  res.render('pages/admin/products', {
    products: products
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