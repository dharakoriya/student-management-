const mongoose = require("mongoose");
const { Schema } = mongoose;


const userSchema = Schema({
  name : {
    type: String,
    required : true,
  },
  mobile: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  isDeleted: {
    type: Boolean,
    default: false,
  },
  otp: { type: String },
},{
  timestamps: true
});

const User = mongoose.model("User", userSchema);

module.exports = User;