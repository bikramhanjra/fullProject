const Student = require("../models/Student");

async function getStudent(req, res) {
  try {
    const result = await Student.find({});
    return res.status(200).json({
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

async function getStudentStatus(req, res) {
  try {
    const status = req.params.status;
    const result = await Student.find({status:status});
    return res.status(200).json({
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

async function getSortedStudents(req, res) {
  try {
    const sortField = req.query.sortField;
    const sortType = req.query.sortType === "dsc" ? -1 : 1;
    const result = await Student.find().sort({ [sortField]: sortType });
    res.status(200).json({
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

async function getStudentById(req, res) {
  try {
    const studentId = req.params.id;
    const result = await Student.findById(studentId);
    return res.status(200).json({
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
      throw new Error(validation.message);
    }

    const result = await Student.create({
      name: input.name,
      dob: input.dob,
      email: input.email,
      status: input.status,
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
    const result = await Student.findByIdAndUpdate(
      studentId,
      {
        name: input.name,
        dob: input.dob,
        email: input.email,
        password: input.password,
        feesPaid: input.feesPaid,
      },
      { new: true }
    );
    return res.status(200).json({
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

async function deleteStudent(req, res) {
  try {
    const studentId = req.params.id;
    await Student.findByIdAndDelete(studentId);
    return res.status(200).json({
      success: true,
    });
  } catch (err) {
    return res.status(400).json({
      success: false,
      message: err.message,
    });
  }
}

async function updateFees(req, res) {
  try {
    const studentId = req.params.id;
    const type = req.params.type;
    const amount = req.body;

    if (type === "deposit") {
      const result = await Student.findByIdAndUpdate(
        studentId,
        {
          $inc: { feesPaid: amount.feesPaid },
        },
        { new: true }
      );
      return res.status(200).json({
        success: true,
        data: result,
      });
    } else if (type === "wihdraw") {
      const result = await Student.findByIdAndUpdate(
        studentId,
        {
          $inc: { feesPaid: -amount.feesPaid },
        },
        { new: true }
      );
      return res.status(200).json({
        success: true,
        data: result,
      });
    } else {
      return res.status(400).json({
        success: false,
        message: "Parameter is Invalid",
      });
    }
  } catch (err) {
    return res.status(400).json({
      success: false,
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
  updateFees,
  getSortedStudents,
  getStudentStatus,
};
