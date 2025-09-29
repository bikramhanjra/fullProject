const EnrolledCourse = require("../models/EnrolledCourses");

async function getEnrolledCourse(req, res) {
  try {
    const result = await EnrolledCourse.find({}).populate("studentId").populate("courseId");
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

async function getEnrolledCourseById(req, res) {
  try {
    const teacherId = req.params.id;
    const result = await EnrolledCourse.findById(teacherId);
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

async function addEnrolledCourse(req, res) {
  try {
    const input = req.body;
    const result = await EnrolledCourse.create({
      studentId: input.studentId,
      courseId: input.courseId,
    });

    const resultData = await result.save();
    return res.status(201).json({
      status: "Created",
      data: resultData,
    });
  } catch (err) {
    return res.status(400).json({
      status: "Error",
      message: err.message,
    });
  }
}

async function updateEnrolledCourse(req, res) {
  try {
    const teacherId = req.params.id;
    const input = req.body;
    const result = await EnrolledCourse.findByIdAndUpdate(teacherId, {
      studentId: input.studentId,
      courseId: input.courseId,
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

async function deleteEnrolledCourse(req, res) {
  try {
    const teacherId = req.params.id;
    await EnrolledCourse.findByIdAndDelete(teacherId);
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
  getEnrolledCourse,
  deleteEnrolledCourse,
  getEnrolledCourseById,
  updateEnrolledCourse,
  addEnrolledCourse,
};
