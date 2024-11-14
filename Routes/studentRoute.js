// routes/studentRoutes.js
const express = require('express');
const studentController = require('../Controllers/studentController');

const router = express.Router();

router.post('/', studentController.createStudent);          // Create a new student
router.get('/', studentController.getAllStudents);          // Get all students
router.get('/:id', studentController.getStudentById);       // Get a student by ID
router.put('/:id', studentController.updateStudent);        // Update a student by ID
router.delete('/:id', studentController.deleteStudent);     // Delete a student by ID

module.exports = router;
