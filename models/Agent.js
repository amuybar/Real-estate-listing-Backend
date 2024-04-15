const mongoose = require('mongoose');

const agentSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true, // Ensures email is unique for each agent
  },
  phone: {
    type: String,
  },
  bio: {
    type: String,
  },
  licenseNumber: {
    type: String,
  },
  profileImage: {
    type: String,
  },
});

module.exports = mongoose.model('Agent', agentSchema);
