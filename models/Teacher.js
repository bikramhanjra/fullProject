const mongoose = require("mongoose");

const TeacherSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  dob: {
    type: String,
  },
  email: {
    type: String,
    unique: true,
  },
  salary: {
    type: Number,
  },
});

const Teacher = mongoose.model("teacher", TeacherSchema);
module.exports = Teacher;
