// models/Booking.js
const mongoose = require('mongoose');
const bookingSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  car: { type: mongoose.Schema.Types.ObjectId, ref: 'Car' },
  type: { type: String, enum: ['test-drive', 'reservation'], default: 'test-drive' },
  date: Date,
  time: String,
  status: { type: String, enum: ['pending', 'confirmed', 'cancelled'], default: 'pending' },
  createdAt: { type: Date, default: Date.now },
});
module.exports = mongoose.model('Booking', bookingSchema);
