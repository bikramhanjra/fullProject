const Teacher = require("../models/Teacher");

async function getTeacher(req, res) {
  try {
    const result = await Teacher.find({});
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

async function getTeacherById(req, res) {
  try {
    const teacherId = req.params.id;
    const result = await Teacher.findById(teacherId);
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
      status: "Created",
      data: result,
    });
  } catch (err) {
    console.log(err)
    return res.status(400).json({
      status: "Error",
      message: err.message,
    });
  }
}

async function updateTeacher(req, res) {
  try {
    const teacherId = req.params.id;
    const input = req.body;
    const result = await Teacher.findByIdAndUpdate(teacherId, {
      name: input.name,
      dob: input.dob,
      email: input.email,
      salary: input.salary,
    }, {new: true});
    return res.status(200).json(
      {
        status: "Success",
        data: result,
      },
    );
  } catch (err) {
    return res.status(400).json({
      status: "Error",
      message: err.message,
    });
  }
}

async function deleteTeacher(req, res) {
  try {
    const teacherId = req.params.id;
    await Teacher.findByIdAndDelete(teacherId);
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
  getTeacher,
  getTeacherById,
  addTeacher,
  updateTeacher,
  deleteTeacher,
};
