const Teacher = require("../models/Teacher");
const mongoose = require("mongoose");
async function getTeacher(req, res) {
  try {
    const result = await Teacher.aggregate([{ $match: {} }]);
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

async function getTeacherById(req, res) {
  try {
    const teacherId = req.params.id;
    const result = await Teacher.aggregate([
      {
        $match: {
          _id: new mongoose.Types.ObjectId(teacherId),
        },
      },
    ]);
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

async function addTeacher(req, res) {
  try {
    const input = req.body;
    const result = await Teacher.create({
      name: input.name,
      dob: input.dob,
      email: input.email,
      salary: input.salary,
    });
    return res.status(201).json({
      success: true,
      data: result,
    });
  } catch (err) {
    console.log(err);
    return res.status(400).json({
      success: false,
      message: err.message,
    });
  }
}

async function updateTeacher(req, res) {
  try {
    const teacherId = req.params.id;
    const input = req.body;
    const result = await Teacher.findByIdAndUpdate(
      teacherId,
      {
        name: input.name,
        dob: input.dob,
        email: input.email,
        salary: input.salary,
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

async function deleteTeacher(req, res) {
  try {
    const teacherId = req.params.id;
    await Teacher.findByIdAndDelete(teacherId);
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

module.exports = {
  getTeacher,
  getTeacherById,
  addTeacher,
  updateTeacher,
  deleteTeacher,
};
