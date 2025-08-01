
// models/Advertisement.js
const mongoose = require('mongoose');

const advertisementSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  type: {
    type: String,
    enum: ['featured', 'banner', 'sidebar', 'popup', 'email'],
    required: true
  },
  position: {
    type: String,
    required: function() {
      return this.type === 'banner' || this.type === 'sidebar';
    }
  },
  vehicles: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Vehicle'
  }],
  content: {
    text: String,
    imageUrl: String,
    videoUrl: String,
    ctaText: String,
    ctaUrl: String
  },
  targetAudience: {
    roles: [String],
    preferences: {
      makes: [String],
      priceRange: {
        min: Number,
        max: Number
      }
    }
  },
  schedule: {
    startDate: {
      type: Date,
      required: true
    },
    endDate: {
      type: Date,
      required: true
    },
    daysOfWeek: [Number], // 0-6 (Sunday-Saturday)
    hours: {
      start: Number, // 0-23
      end: Number // 0-23
    }
  },
  budget: {
    total: Number,
    spent: Number,
    dailyLimit: Number
  },
  status: {
    type: String,
    enum: ['draft', 'active', 'paused', 'completed', 'archived'],
    default: 'draft'
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  performance: {
    impressions: Number,
    clicks: Number,
    conversions: Number,
    ctr: Number,
    costPerClick: Number
  }
}, {
  timestamps: true
});

// Indexes
advertisementSchema.index({ status: 1, type: 1 });
advertisementSchema.index({ 'schedule.startDate': 1, 'schedule.endDate': 1 });
advertisementSchema.index({ createdBy: 1 });

module.exports = mongoose.model('Advertisement', advertisementSchema);
