const mongoose = require("mongoose");
const CourseSchema = new mongoose.Schema({
  courseName: {
    type: String,
    unique: true,
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
    type: Date,
  },
});

const Course = mongoose.model("course", CourseSchema);
module.exports = Course;
