const mongoose = require('mongoose');

const propertySchema = new mongoose.Schema({
  address: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  bedrooms: {
    type: Number,
    required: true,
  },
  bathrooms: {
    type: Number,
    required: true,
  },
  squareFootage: {
    type: Number,
    required: true,
  },
  amenities: {
    type: [String],
  },
  description: {
    type: String,
    required: true,
  },
  images: {
    type: [String],
  },
  location: {
    type: {
      type: String,
      enum: ['Point'], 
    },
    coordinates: {
      type: [Number],
      index: '2dsphere', 
    },
  },

});

module.exports = mongoose.model('Property', propertySchema);
