const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


exports.register = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    let existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user with the hashed password
    const newUser = new User({ username, email, password: hashedPassword });

    // Save the new user to the database
    await newUser.save();

    // Send success response
    res.status(201).json({ message: 'User created successfully' });
  } catch (error) {
    console.error('Error in user sign-up:', error);

    // Check if the error is related to hashing
    if (error.name === 'BcryptError') {
      return res.status(500).json({ message: 'Error hashing password' });
    }

    // Handle other errors
    res.status(500).json({ message: 'Server error' });
  }
};


// Login api
exports.login = async (req, res) => {
  try {
      console.log('Login request received:', req.body);

      const { email, password } = req.body;
      
      const user = await User.findOne({ email });
      if (!user) {
          console.log('User not found');
          return res.status(400).json({ message: "User does not exist" });
      }

    
      const validPassword = await bcrypt.compareSync(password, user.password);
      console.log(validPassword);
      if (!validPassword) {
          console.log('Incorrect password');
          return res.status(401).json({ message: "Incorrect password" });
      }

     
      const token = jwt.sign({ username: user.username }, 'processenvJWT_SECRET', { expiresIn: '1h' });

      console.log('JWT token generated:', token);

      res.cookie('token', token, { httpOnly: true, maxAge: 360000 });
     
      return res.status(200).json({ status: true, message: "Login successful" });

  } catch (error) {
     return res.status(500).json({ message: "Error logging in: " + error.message });
  }
};