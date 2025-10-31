const mongoose = require("mongoose");

const StudentSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  dob: {
    type: Date,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
  },
  courseId: {
    type: new mongoose.Schema.Types.ObjectId,
    ref: "course"
  },
  feesPaid: {
    type: Number,
  },
  status:{
    type: String,
    enum: ["active", "inActive"],
  }
});

const Student = mongoose.model("student", StudentSchema);
module.exports = Student;
