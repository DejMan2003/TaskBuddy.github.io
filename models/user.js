const mongoose = require("mongoose");

// Task schema and model
const TaskSchema = new mongoose.Schema({
  text: { type: String, required: true },
});


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
  tasks:[TaskSchema],
  
},{timestamps: true,});

module.exports = mongoose.model('User', UserSchema);