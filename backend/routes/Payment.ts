// models/Payment.js
const mongoose = require('mongoose');
const paymentSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  car: { type: mongoose.Schema.Types.ObjectId, ref: 'Car' },
  amount: Number,
  paymentMethod: String, // e.g. 'stripe', 'paypal'
  transactionId: String,
  status: { type: String, enum: ['success', 'failed', 'pending'], default: 'pending' },
  createdAt: { type: Date, default: Date.now },
});
module.exports = mongoose.model('Payment', paymentSchema);
