const mongoose = require("mongoose");

const TeacherSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  dob: {
    type: Date,
    required: true,
  },
  email: {
    type: String,
    unique: true,
    required: true
  },
  salary: {
    type: Number,
  },
});

const Teacher = mongoose.model("teacher", TeacherSchema);
module.exports = Teacher;
