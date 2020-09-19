const express = require('express');

const router = express.Router();

router.get('/admin/products', async (req, res) => {
  var products = [{
    name: "Tomate",
    price: 2.90
  }, {
    name: "Bergamota",
    price: 1.99
  }, {
    name: "Laranja",
    price: 3
  }];

  res.render('pages/admin/products', {
    products: products
  });
});

module.exports = router;