const express = require('express');
// const orderRepo = require('../models/order');
const productsRepo = require('../models/product');

const router = express.Router();

// Receive a post request to create new order
router.post('/', async (req, res) => {
    /* const { order } = req.body;

    orderRepo.create(order, (err, createdOrder) => {
        if(err) {
            console.log(err);
        }
    });  */ 
    console.log(req.body)
    res.redirect('/');
});

module.exports = router;