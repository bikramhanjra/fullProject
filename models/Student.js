const mongoose = require("mongoose");

const StudentSchema = new mongoose.Schema({
  studentName: {
    type: String,
  },
  studentDob: {
    type: String,
  },
  studentEmail: {
    type: String,
  },
  studentPassword: {
    type: String,
  },
  st_PaidFees: {
    type: Number,
  },
});

const Student = mongoose.model("Student", StudentSchema);
module.exports = Student;
