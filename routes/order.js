const express = require('express');
const orderRepo = require('../models/order');
const cartsRepo = require('../models/cart');
const { isAuthenticated, isProdutor } = require('../middlewares/isAuthenticated');

const router = express.Router();

// Receive a post request to create new order
router.post('/', isAuthenticated, async (req, res) => {
    const { product } = req.body;
    const { _id, idCart, email, firstName, lastName } = req.user;
    
    let orders = Object.values(product.reduce((order, {producer, ...props}) => {
        if (!order[producer]) {
            order[producer] = Object.assign({}, {producer, products : [props]});
        } else {
            order[producer].products.push(props);
        }
        return order;
    }, {}));

    orders.forEach(order => {
        order.costumer = _id;
        order.costumerEmail = email;
        order.costumerFirstName = firstName;
        order.costumerLastName = lastName;

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

// exibe lista de pedidos do consumidor
router.get('/', isAuthenticated, (req, res) => {
    orderRepo.find({ costumer: req.user._id }, (err, orders) => {
        if(err){
            console.log(err);
            res.redirect('/');
        } else {
            res.render('pages/orders/', { orders });
        }
    });
});

// exibe lista de pedidos do produtor
router.get('/producer', isProdutor, (req, res) => {
    orderRepo.find({ producer: req.user._id }, (err, orders) => {
        if(err){
            console.log(err);
            res.redirect('/');
        } else {
            res.render('pages/orders/producer/index', { orders });
        }
    });
});

// busca informações de pedidos do consumidor
router.get('/:id', isAuthenticated, async(req, res) => {
    orderRepo.findById(req.params.id, (err, foundOrder) => {
        if(err) {
            req.flash("error", "O pedido não foi encontrado!");
            res.redirect("/order/producer");
        }
        if(foundOrder.costumer == req.user._id) {
            res.render('pages/orders/show', { order: foundOrder });
        } else {
            req.flash("error", "Parece que este pedido não é de sua responsabilidade!");
            res.redirect("/order/");
        }
    });
});

// busca informações de pedidos do produtor
router.get('/:id/producer', isProdutor, async(req, res) => {
    orderRepo.findById(req.params.id, (err, foundOrder) => {
        if(err) {
            req.flash("error", "O pedido não foi encontrado!");
            res.redirect("/order/producer");
        }
        if(foundOrder.producer == req.user._id) {
            res.render('pages/orders/producer/show', { order: foundOrder });
        } else {
            req.flash("error", "Parece que este pedido não é de sua responsabilidade!");
            res.redirect("/order/producer");
        }
    });
});

// Atualizar status do pedido
router.put('/:id', isAuthenticated, (req, res) => {
    const { status } = req.body;
    console.log(status)
    orderRepo.findById(req.params.id, (err, foundOrder) => {
        if(err) {
            console.log(err);
        }
        //foundOrder.status = status; 
        //foundOrder.save();
        if(req.user._id == foundOrder.producer) {
            console.log('o usuario é o produtor')
            res.redirect("/order/" + req.params.id + "/producer");
        } else if(req.user._id == foundOrder.costumer) {
            console.log('o usuario é o consumidor')
            res.redirect("/order/" + req.params.id);
        }
    });
});

module.exports = router;