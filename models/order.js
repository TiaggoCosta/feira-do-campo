const mongoose = require('mongoose');

const OrderSchema = new mongoose.Schema({
   costumer: String,
   producer: String,
   products: [
      {
         productId: String,
         quantity: Number
      }
   ],
   createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Order', OrderSchema);