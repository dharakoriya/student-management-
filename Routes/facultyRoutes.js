const express = require('express');
const router = express.Router();
const facultyController = require('../Controllers/facultyController');

// Create a new faculty member
router.post('/', facultyController.createFaculty);

// Get all faculty members
router.get('/', facultyController.getAllFaculty);

// Get a faculty member by ID
router.get('/:id', facultyController.getFacultyById);

// Update a faculty member by ID
router.put('/:id', facultyController.updateFacultyById);

// Delete a faculty member by ID
router.delete('/:id', facultyController.deleteFacultyById);

module.exports = router;
