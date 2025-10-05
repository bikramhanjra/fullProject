const mongoose = require("mongoose");

const StudentSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  dob: {
    type: String,
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
