const mongoose = require('mongoose');

const OrderSchema = new mongoose.Schema({
   costumer: String,
   costumerEmail: String,
   costumerFirstName: String,
   costumerLastName: String,
   producer: String,
   products: [
      {
         productId: String,
         quantity: Number,
         price: String
      }
   ],
   createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Order', OrderSchema);