const express =require("express");
const cookie =require('cookie-parser');
const cors=require('cors');


const mongoose=require("mongoose");
const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/user');
const propertyRoutes = require('./routes/property');
const agentRoutes = require('./routes/agent');
const testimonialRoutes = require('./routes/testmonial');

const app=express();
app.use(express.json());
app.use(cookie());
app.use(cors());



app.use('/auth', authRoutes);
app.use('/user', userRoutes);
app.use('/properties', propertyRoutes);
app.use('/agents', agentRoutes);
app.use('/testimonials', testimonialRoutes);


mongoose.connect("mongodb+srv://Barry:Amuy%232000@cluster.3kuya2i.mongodb.net/").then(() => {
  console.log('Connected to MongoDB');
}).catch(err => {
  console.error('Error connecting to MongoDB:', err);
});



app.listen(3000,()=>{
  console.log("Server running on port 3000");
});