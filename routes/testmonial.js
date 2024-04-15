const express = require('express');
const router = express.Router();
const testimonialController = require('../controllers/TestmonialControllers');
const { authenticate } = require('../middleware/auth');


// Create a testimonial
// Create a testimonial
router.post('/', authenticate, testimonialController.createTestimonial);


// Get all testimonials
router.get('/', testimonialController.getTestimonials);

// Get a single testimonial by ID
router.get('/:id', testimonialController.getTestimonialById);

// Update a testimonial by ID
router.put('/:id',authenticate, testimonialController.updateTestimonial);

// Delete a testimonial by ID
router.delete('/:id',authenticate, testimonialController.deleteTestimonial);

module.exports = router;
