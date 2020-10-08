const mongoose = require('mongoose');

const CartSchema = new mongoose.Schema({
    items: [
        {
           type: mongoose.Schema.Types.ObjectId,
           ref: "Product"
        }
     ]
});

module.exports = mongoose.model('Cart', CartSchema);