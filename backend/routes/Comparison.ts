// models/Comparison.js
const mongoose = require('mongoose');

const comparisonSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  name: {
    type: String,
    default: 'My Comparison'
  },
  vehicles: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Vehicle'
  }],
  attributesToCompare: [String],
  lastViewed: Date,
  isShared: {
    type: Boolean,
    default: false
  },
  shareToken: String,
  shareExpires: Date
}, {
  timestamps: true
});

// Indexes
comparisonSchema.index({ user: 1 });
comparisonSchema.index({ shareToken: 1 }, { unique: true, sparse: true });

module.exports = mongoose.model('Comparison', comparisonSchema);