const mongoose = require("mongoose");

//User Schema for the MongoDB
const UserSchema = new mongoose.Schema({
  name: 
  {
    type: String,
    required: true
  },
  email: 
  {
    type: String,
    required: true,
    unique: true,
  },
  password: 
  {
    type: String,
    required: true, 
  },
},{timestamps: true,});

module.exports = mongoose.model('User', UserSchema);