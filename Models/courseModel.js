const mongoose = require('mongoose');

const courseSchema = new mongoose.Schema({
    courseCode: { type: String, required: true, unique: true },
    courseName: { type: String, required: true },
    description: { type: String },
    credits: { type: Number, required: true },
    department: { type: String, required: true },
    instructor: { type: String }, // Can be populated with instructor's ID if necessary
    semester: { type: String }, // Optional: can be used to specify which semester this course is taught in
});

module.exports = mongoose.model('Course', courseSchema);
