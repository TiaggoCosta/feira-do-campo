const express = require('express');
const router  = express.Router();
const Product = require('../models/product');

router.get('/', (req, res) => {
    res.render('pages/home');
});

module.exports = router;