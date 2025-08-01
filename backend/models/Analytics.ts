// models/Analytics.js
const mongoose = require('mongoose');

const analyticsSchema = new mongoose.Schema({
  vehicle: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Vehicle',
    required: true
  },
  date: {
    type: Date,
    required: true,
    default: Date.now
  },
  views: {
    type: Number,
    default: 0
  },
  uniqueVisitors: {
    type: Number,
    default: 0
  },
  inquiries: {
    type: Number,
    default: 0
  },
  testDrivesScheduled: {
    type: Number,
    default: 0
  },
  shares: {
    type: Number,
    default: 0
  },
  favoritesAdded: {
    type: Number,
    default: 0
  },
  priceChanges: [{
    oldPrice: Number,
    newPrice: Number,
    changedAt: Date,
    changedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    }
  }],
  statusChanges: [{
    oldStatus: String,
    newStatus: String,
    changedAt: Date,
    changedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    }
  }]
}, {
  timestamps: true
});

// Indexes
analyticsSchema.index({ vehicle: 1, date: 1 });

// Compound index for time-based queries
analyticsSchema.index({ date: 1, views: 1 });

module.exports = mongoose.model('Analytics', analyticsSchema);
