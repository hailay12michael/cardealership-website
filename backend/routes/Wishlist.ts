// models/Wishlist.js
const mongoose = require('mongoose');
const wishlistSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  car: { type: mongoose.Schema.Types.ObjectId, ref: 'Car' },
  addedAt: { type: Date, default: Date.now },
});
module.exports = mongoose.model('Wishlist', wishlistSchema);
