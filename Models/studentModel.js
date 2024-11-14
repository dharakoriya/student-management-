// models/studentModel.js
const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
    studentId: { type: String, required: true, unique: true },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    dateOfBirth: { type: Date, required: true },
    gender: { type: String, enum: ['Male', 'Female', 'Other'], required: true },
    email: { type: String, required: true, unique: true },
    phoneNumber: { type: String, required: true },
    address: {
        street: { type: String },
        city: { type: String },
        state: { type: String },
        postalCode: { type: String },
        country: { type: String }
    },
    enrollmentDate: { type: Date, default: Date.now },
    program: { type: String, required: true },
    batch: { type: String },
    studentStatus: { type: String, enum: ['Active', 'Inactive', 'Graduated', 'Suspended'], default: 'Active' },
    guardianDetails: {
        name: { type: String },
        relationship: { type: String },
        phoneNumber: { type: String },
        email: { type: String }
    },
    academicRecords: {
        currentGPA: { type: Number, min: 0, max: 4.0 },
        completedCredits: { type: Number },
        courses: [{ type: String }]
    },
    attendanceRecords: [{ date: { type: Date }, status: { type: String, enum: ['Present', 'Absent', 'Late', 'Excused'] } }],
    extracurricularActivities: [{ type: String }],
    emergencyContact: {
        name: { type: String },
        phoneNumber: { type: String },
        relationship: { type: String }
    },
    profilePictureUrl: { type: String },
    notes: { type: String },
    verificationStatus: { type: String, enum: ['Verified', 'Pending Verification'], default: 'Pending Verification' }
}, { timestamps: true });

module.exports = mongoose.model('Student', studentSchema);
