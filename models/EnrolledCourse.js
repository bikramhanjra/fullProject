const mongoose = require("mongoose");
const EnrolledCourseSchema = new mongoose.Schema({
  studentId:{
    type: mongoose.Schema.Types.ObjectId,
    ref:"student"
  },
   courseId:{
    type: mongoose.Schema.Types.ObjectId,
    ref:"course"
  },
});

const EnrolledCourse = mongoose.model("enrolledCourse", EnrolledCourseSchema);
module.exports = EnrolledCourse;
