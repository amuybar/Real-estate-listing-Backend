const Property = require('../models/Property');

// Controller functions
exports.getAllProperties = async (req, res) => {
  try {
    const properties = await Property.find();
    res.json(properties);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getPropertyById = async (req, res) => {
  try {
    const property = await Property.findById(req.params.id);
    if (property) {
      res.json(property);
    } else {
      res.status(404).json({ message: 'Property not found' });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.createProperty = async (req, res) => {
  // Extract property details from the request body
  const { address, price, bedrooms, bathrooms, squareFootage, amenities, description, location } = req.body;
  
  const images =  req.files.map(file => `/images/${file.filename}`);

  try {
    const newProperty = await Property.create({
      address,
      price,
      bedrooms,
      bathrooms,
      squareFootage,
      amenities,
      description,
      images, 
      location
    });

    // Respond with the newly created property
    res.status(201).json(newProperty);
  } catch (err) {
    // Handle errors
    res.status(400).json({ message: err.message });
  }
};


exports.updateProperty = async (req, res) => {
  try {
    const property = await Property.findById(req.params.id);
    if (property) {
      Object.assign(property, req.body);
      const updatedProperty = await property.save();
      res.json(updatedProperty);
    } else {
      res.status(404).json({ message: 'Property not found' });
    }
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.deleteProperty = async (req, res) => {
  try {
    const property = await Property.findById(req.params.id);
    if (property) {
      await property.remove();
      res.json({ message: 'Property deleted' });
    } else {
      res.status(404).json({ message: 'Property not found' });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
