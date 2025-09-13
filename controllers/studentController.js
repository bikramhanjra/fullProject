const Student = require("../models/Student");

async function getStudent(req, res) {
  try {
    const result = await Student.find({});
    return res.status(200).json({
      status: "Success",
      data: result,
    });
  } catch (err) {
    return res.status(400).json({
      status: "Error",
      message: err.message,
    });
  };
};

async function getStudentById(req, res) {
  try {
    const studentId = req.params.id;
    const result = await Student.findById(studentId);
    return res.status(200).json({
      status: "Success",
      data: result,
    });
  } catch (err) {
    return res.status(400).json({
      status: "Error",
      message: err.message,
    });
  };
};

async function addStudent(req, res) {
  try {
    const input = req.body;
    const result = await Student.create({
      studentName: input.studentName,
      studentDob: input.studentDob,
      studentEmail: input.studentEmail,
      studentPassword: input.studentPassword,
      st_PaidFees: input.st_PaidFees,
    });
    return res.status(201).json({
      status: "Created",
      data: result,
    });
  } catch (err) {
    return res.status(400).json({
      status: "Error",
      message: err.message,
    });
  }
}

async function updateStudent(req, res) {
  try {
    const studentId = req.params.id;
    const input = req.body;
    const result = await Student.findByIdAndUpdate(studentId, {
      studentName: input.studentName,
      studentDob: input.studentDob,
      studentEmail: input.studentEmail,
      studentPassword: input.studentPassword,
      st_PaidFees: input.st_PaidFees,
    });
    return res.status(200).json(
      {
        status: "Success",
        data: result,
      },
      { new: true }
    );
  } catch (err) {
    return res.status(400).json({
      status: "Error",
      message: err.message,
    });
  }
}

async function deleteStudent(req, res) {
  try {
    const studentId = req.params.id;
    await Student.findByIdAndDelete(studentId);
    return res.status(200).json({
      status: "Deleted",
    });
  } catch (err) {
    return res.status(400).json({
      status: "Error",
      message: err.message,
    });
  }
}

module.exports = {
  getStudent,
  getStudentById,
  addStudent,
  updateStudent,
  deleteStudent,
};
