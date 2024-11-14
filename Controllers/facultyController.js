const Faculty = require('../Models/facultyModel');

// Create new faculty
exports.createFaculty = async (req, res) => {
    try {
        const faculty = new Faculty(req.body);
        await faculty.save();
        res.status(201).json(faculty);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Get all faculty members
exports.getAllFaculty = async (req, res) => {
    try {
        const facultyList = await Faculty.find();
        res.status(200).json(facultyList);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get a single faculty member by ID
exports.getFacultyById = async (req, res) => {
    try {
        const faculty = await Faculty.findById(req.params.id);
        if (!faculty) return res.status(404).json({ message: 'Faculty member not found' });
        res.status(200).json(faculty);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Update faculty member by ID
exports.updateFacultyById = async (req, res) => {
    try {
        const faculty = await Faculty.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!faculty) return res.status(404).json({ message: 'Faculty member not found' });
        res.status(200).json(faculty);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Delete faculty member by ID
exports.deleteFacultyById = async (req, res) => {
    try {
        const faculty = await Faculty.findByIdAndDelete(req.params.id);
        if (!faculty) return res.status(404).json({ message: 'Faculty member not found' });
        res.status(200).json({ message: 'Faculty member deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
