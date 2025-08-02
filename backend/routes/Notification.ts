// models/Notification.js
const mongoose = require('mongoose');

const notificationSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  title: {
    type: String,
    required: true
  },
  message: {
    type: String,
    required: true
  },
  type: {
    type: String,
    enum: ['system', 'message', 'alert', 'promotion', 'reminder'],
    required: true
  },
  relatedEntity: {
    type: String,
    enum: ['vehicle', 'testDrive', 'financing', 'tradeIn', 'none'],
    default: 'none'
  },
  entityId: mongoose.Schema.Types.ObjectId,
  isRead: {
    type: Boolean,
    default: false
  },
  actionUrl: String,
  priority: {
    type: Number,
    min: 1,
    max: 5,
    default: 3
  },
  expiresAt: Date
}, {
  timestamps: true
});

// Indexes
notificationSchema.index({ user: 1, isRead: 1 });
notificationSchema.index({ createdAt: -1 });
notificationSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 });

module.exports = mongoose.model('Notification', notificationSchema);