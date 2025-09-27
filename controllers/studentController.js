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
      success: true,
      message: err.message,
    });
  }
}

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
  }
}

function isValidate(input) {
  if (!input.email) {
    return { isValid: false, message: "email is required" };
  }
  if (!input.dob) {
    return { isValid: false, message: "Dob is required" };
  }

  return { isValid: true, message: "Requirements are fullfilled" };
}

async function addStudent(req, res) {
  try {
    const input = req.body;
    const validation = isValidate(input);

    if (!validation.isValid) {
     throw new Error(validation.message)
    }

    const result = await Student.create({
      name: input.name,
      dob: input.dob,
      email: input.email,
      password: input.password,
      feesPaid: input.feesPaid,
    });

    return res.status(201).json({
      success: true,
      data: result,
    });
  } catch (err) {
    return res.status(400).json({
      success: false,
      message: err.message,
    });
  }
}

async function updateStudent(req, res) {
  try {
    const studentId = req.params.id;
    const input = req.body;
    const result = await Student.findByIdAndUpdate(studentId, {
      name: input.name,
      dob: input.dob,
      email: input.email,
      password: input.password,
      feesPaid: input.feesPaid,
    },  { new: true });
    return res.status(200).json(
      {
        status: "Success",
        data: result,
      }
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
