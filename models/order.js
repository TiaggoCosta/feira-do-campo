const mongoose = require('mongoose');

const OrderSchema = new mongoose.Schema({
   costumer: String,
   producer: String,
   items: [
      {
         productId: String,
         quantity: Number
      }
   ],
   createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Order', OrderSchema);