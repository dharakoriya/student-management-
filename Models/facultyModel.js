const mongoose = require('mongoose');

const facultySchema = new mongoose.Schema({
    facultyId: { type: String, required: true, unique: true },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    dateOfBirth: { type: Date, required: true },
    gender: { type: String, required: true, enum: ['Male', 'Female', 'Other'] },
    email: { type: String, required: true, unique: true },
    phoneNumber: { type: String, required: true },
    address: {
        street: { type: String },
        city: { type: String },
        state: { type: String },
        postalCode: { type: String },
        country: { type: String }
    },
    hireDate: { type: Date, required: true },
    department: { type: String, required: true },
    position: { type: String, required: true },
    employmentStatus: { type: String, required: true, enum: ['Active', 'On Leave', 'Retired', 'Resigned'] },
    qualifications: [{ type: String }],
    subjects: [{ type: String }],
    coursesHandled: [{ type: String }],
    emergencyContact: {
        name: { type: String },
        phoneNumber: { type: String },
        relationship: { type: String }
    },
    profilePictureUrl: { type: String },
    notes: { type: String },
    verificationStatus: { type: String, enum: ['Verified', 'Pending Verification'], default: 'Pending Verification' }
});

module.exports = mongoose.model('Faculty', facultySchema);
