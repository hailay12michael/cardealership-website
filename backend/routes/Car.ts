// models/Vehicle.js
const mongoose = require('mongoose');

const vehicleSchema = new mongoose.Schema({
  make: {
    type: String,
    required: true,
    index: true
  },
  model: {
    type: String,
    required: true,
    index: true
  },
  year: {
    type: Number,
    required: true,
    min: 1900,
    max: new Date().getFullYear() + 1
  },
  price: {
    type: Number,
    required: true,
    min: 0
  },
  mileage: {
    type: Number,
    required: true,
    min: 0
  },
  exteriorColor: String,
  interiorColor: String,
  fuelType: {
    type: String,
    enum: ['Gasoline', 'Diesel', 'Electric', 'Hybrid', 'Plug-in Hybrid', 'Other'],
    required: true
  },
  transmission: {
    type: String,
    enum: ['Automatic', 'Manual', 'CVT', 'DCT', 'Other'],
    required: true
  },
  bodyType: {
    type: String,
    enum: ['Sedan', 'SUV', 'Truck', 'Coupe', 'Convertible', 'Hatchback', 'Minivan', 'Van', 'Wagon', 'Other'],
    required: true
  },
  vin: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator: function(v) {
        return /^[A-HJ-NPR-Z0-9]{17}$/.test(v);
      },
      message: props => `${props.value} is not a valid VIN!`
    }
  },
  description: String,
  features: [{
    category: String,
    items: [String]
  }],
  images: [{
    url: String,
    isPrimary: Boolean,
    caption: String
  }],
  videos: [String],
  specifications: {
    engine: String,
    horsepower: Number,
    torque: Number,
    drivetrain: String,
    seatingCapacity: Number,
    cargoVolume: String,
    fuelEconomy: {
      city: Number,
      highway: Number,
      combined: Number
    },
    safetyRatings: {
      nhtsa: Number,
      iihs: String
    }
  },
  status: {
    type: String,
    enum: ['available', 'pending', 'sold', 'reserved'],
    default: 'available'
  },
  listingType: {
    type: String,
    enum: ['standard', 'featured', 'premium'],
    default: 'standard'
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  lastUpdatedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  deletedAt: Date
}, {
  timestamps: true,
  toJSON: { virtuals: true }
});

// Virtuals
vehicleSchema.virtual('fullName').get(function() {
  return `${this.year} ${this.make} ${this.model}`;
});

vehicleSchema.virtual('age').get(function() {
  return new Date().getFullYear() - this.year;
});

// Indexes
vehicleSchema.index({ make: 1, model: 1 });
vehicleSchema.index({ price: 1 });
vehicleSchema.index({ year: -1 });
vehicleSchema.index({ status: 1, listingType: 1 });

// Pre-save hook to set lastUpdatedBy
vehicleSchema.pre('save', function(next) {
  if (this.isModified()) {
    this.lastUpdatedBy = this.createdBy; // In real app, this would be the current user
  }
  next();
});

module.exports = mongoose.model('Vehicle', vehicleSchema);