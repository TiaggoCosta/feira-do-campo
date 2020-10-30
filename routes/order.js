const express = require('express');
const orderRepo = require('../models/order');
const productsRepo = require('../models/product');

const router = express.Router();

// Receive a post request to create new order
router.post('/', async (req, res) => {
    const { product } = req.body;
    
    let orders = Object.values(product.reduce((order, {producer, ...props}) => {
        if (!order[producer]) {
            order[producer] = Object.assign({}, {producer,products : [props]});
        } else {
            order[producer].products.push(props);
        }
        return order;
    }, {}));

    orders.forEach(order => {
        order.costumer = req.user._id;
        
        orderRepo.create(order, (err, createdOrder) => {
            if(err) {
                console.log(err);
            } else {
                console.log(createdOrder);
            }
        });
    });
    
    res.redirect('/');
});

module.exports = router;