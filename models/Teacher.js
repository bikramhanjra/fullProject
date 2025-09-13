const mongoose = require("mongoose");

const TeacherSchema = new mongoose.Schema({
  teacherName: {
    type: String,
  },
  teacherDob: {
    type: String,
  },
  teacherEmail: {
    type: String,
  },
  teacherSalary: {
    type: Number,
  },
});

const Teacher = mongoose.model("teacher", TeacherSchema);
module.exports = Teacher;
