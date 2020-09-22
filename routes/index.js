const express = require('express');
const router  = express.Router();
const Product = require('../models/product');

router.get('/', (req, res) => {
    Product.find({}, (err, products) => {
        if(err){
            console.log(err);
        } else {
           res.render('pages/home',{ products });
        }
    });
});

module.exports = router;