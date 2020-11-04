const express = require('express');
const orderRepo = require('../models/order');
const cartsRepo = require('../models/cart');
const { isAuthenticated, isProdutor } = require('../middlewares/isAuthenticated');

const router = express.Router();

// Receive a post request to create new order
router.post('/', isAuthenticated, async (req, res) => {
    const { product } = req.body;
    const { _id, idCart } = req.user;
    
    let orders = Object.values(product.reduce((order, {producer, ...props}) => {
        if (!order[producer]) {
            order[producer] = Object.assign({}, {producer,products : [props]});
        } else {
            order[producer].products.push(props);
        }
        return order;
    }, {}));

    orders.forEach(order => {
        order.costumer = _id;
        
        orderRepo.create(order, (err, createdOrder) => {
            if(err) {
                console.log(err);
            }
        });
    });

    cartsRepo.findById(idCart, (err, foundCart) => {
        if(err) {
            console.log(err);
        }
        foundCart.items = [];
        foundCart.save();
    });
    
    res.redirect('/');
});

// INDEX - GET all orders
router.get('/producer', isProdutor, (req, res) => {
    orderRepo.find({ producer: req.user._id }, (err, orders) => {
      if(err){
        console.log(err);
        res.redirect('/');
      } else {
          console.log(orders);
        //res.render('pages/orders/producer', { orders });
      }
    });
  });

module.exports = router;