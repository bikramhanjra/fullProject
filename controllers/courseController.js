const Course = require("../models/Course");

async function getCourse(req, res) {
  try {
    const result = await Course.find({});
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

async function getCourseById(req, res) {
  try {
    const teacherId = req.params.id;
    const result = await Course.findById(teacherId);
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

async function addCourse(req, res) {
  try {
    const input = req.body;
    const result = await Course.create({
      courseName: input.courseName,
      capacity: input.capacity,
      courseFees: input.courseFees,
      courseDuration: input.courseDuration,
      courseStartDate: input.courseStartDate,
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

async function updateCourse(req, res) {
  try {
    const teacherId = req.params.id;
    const input = req.body;
    const result = await Course.findByIdAndUpdate(teacherId, {
      courseName: input.courseName,
      capacity: input.capacity,
      courseFees: input.courseFees,
      courseDuration: input.courseDuration,
      courseStartDate: input.courseStartDate,
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

async function deleteCourse(req, res) {
  try {
    const teacherId = req.params.id;
    await Course.findByIdAndDelete(teacherId);
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
  getCourse,
  getCourseById,
  addCourse,
  updateCourse,
  deleteCourse,
};
