const Testimonial = require('../models/Testmonials');

exports.createTestimonial = async (req, res) => {
  const { testimonial, location } = req.body;
 const userId = req.user.id; // Assuming the authenticated user's ID is available in req.user.id
 
  try {
    // Create the testimonial with the authenticated user's ID
    const newTestimonial = new Testimonial({
      testimonial,
      user: userId,
      location,
    });

    await newTestimonial.save();
  
    res.status(201).json(newTestimonial);
  } catch (err) {
    console.error("Error creating testimonial:", err); // Log any errors
    res.status(400).json({ message: err.message });
  }
};


exports.getTestimonials = async (req, res) => {
  try {
    const testimonials = await Testimonial.find().populate('user', 'firstName lastName email'); // Populate user details
    res.json(testimonials);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getTestimonialById = async (req, res) => {
  try {
    const testimonial = await Testimonial.findById(req.params.id).populate('user', 'firstName lastName email'); // Populate user details
    if (!testimonial) {
      return res.status(404).json({ message: 'Testimonial not found' });
    }
    res.json(testimonial);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.updateTestimonial = async (req, res) => {
  try {
    const { testimonial, location } = req.body;
    const updatedTestimonial = await Testimonial.findByIdAndUpdate(req.params.id, { testimonial, location }, { new: true });
    if (!updatedTestimonial) {
      return res.status(404).json({ message: 'Testimonial not found' });
    }
    res.json(updatedTestimonial);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.deleteTestimonial = async (req, res) => {
  try {
    const deletedTestimonial = await Testimonial.findByIdAndDelete(req.params.id);
    if (!deletedTestimonial) {
      return res.status(404).json({ message: 'Testimonial not found' });
    }
    res.json({ message: 'Testimonial deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};