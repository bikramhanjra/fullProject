const mongoose = require("mongoose");
const CourseSchema = new mongoose.Schema({
  courseName: {
    type: String,
  },
  teacherId:{
    type: mongoose.Schema.Types.ObjectId,
    ref:"teacher"
  },
  capacity: {
    type: Number,
  },
  courseFees: {
    type: Number,
  },
  courseDuration: {
    type: String,
  },
  courseStartDate: {
    type: String,
  },
});

const Course = mongoose.model("course", CourseSchema);
module.exports = Course;
