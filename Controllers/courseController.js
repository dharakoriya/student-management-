const Course = require('../Models/courseModel');

// Create a new course
exports.createCourse = async (req, res) => {
    try {
        const course = new Course(req.body);
        await course.save();
        res.status(201).json(course);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Get all courses
exports.getAllCourses = async (req, res) => {
    try {
        const courses = await Course.find();
        res.status(200).json(courses);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get a single course by ID
exports.getCourseById = async (req, res) => {
    try {
        const course = await Course.findById(req.params.id);
        if (!course) return res.status(404).json({ message: 'Course not found' });
        res.status(200).json(course);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Update course by ID
exports.updateCourseById = async (req, res) => {
    try {
        const course = await Course.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!course) return res.status(404).json({ message: 'Course not found' });
        res.status(200).json(course);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Delete course by ID
exports.deleteCourseById = async (req, res) => {
    try {
        const course = await Course.findByIdAndDelete(req.params.id);
        if (!course) return res.status(404).json({ message: 'Course not found' });
        res.status(200).json({ message: 'Course deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
