const express = require("express");
const cookie = require('cookie-parser');
const cors = require('cors');

const mongoose = require("mongoose");

// Require environment variables from .env file
require('dotenv').config();

const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/user');
const propertyRoutes = require('./routes/property');
const agentRoutes = require('./routes/agent');
const testimonialRoutes = require('./routes/testmonial');

const app = express();
app.use(express.json());
app.use(cookie());
app.use(cors());

// Connect to MongoDB using environment variable
const mongoURI = process.env.MONGO_URI;
mongoose.connect(mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('Connected to MongoDB'))
.catch(err => console.error('Error connecting to MongoDB:', err));

app.use('/auth', authRoutes);
app.use('/user', userRoutes);
app.use('/properties', propertyRoutes);
app.use('/agents', agentRoutes);
app.use('/testimonials', testimonialRoutes);

app.listen(3000, () => {
  console.log("Server running on port 3000");
});
