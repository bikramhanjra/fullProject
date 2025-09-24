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
  },
  password: {
    type: String,
  },
  feesPaid: {
    type: Number,
  },
});

const Student = mongoose.model("student", StudentSchema);
module.exports = Student;
