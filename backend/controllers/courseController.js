const Course = require("../models/Course");
const mongoose = require("mongoose");

async function getCourse(req, res) {
  try {
    const result = await Course.aggregate([
      {
        $lookup: {
          from: "teachers",
          localField: "teacherId",
          foreignField: "_id",
          as: "TeacherDetails",
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

async function getCourseById(req, res) {
  try {
    const courseId = req.params.id;
    const result = await Course.aggregate([
      { $match: { _id: new mongoose.Types.ObjectId(courseId) } },
      {
        $lookup: {
          from: "teachers",
          localField: "teacherId",
          foreignField: "_id",
          as: "TeacherDetails",
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


async function getCourseByTeacherId(req, res) {
  try {
    const teacherId = req.params.id;
    console.log("teacherID", teacherId)
    const result = await Course.aggregate([
      { $match: { teacherId: new mongoose.Types.ObjectId(teacherId) } }
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

async function addCourse(req, res) {
  try {
    const input = req.body;
    const result = await Course.create({
      courseName: input.courseName,
      teacherId: input.teacherId,
      capacity: input.capacity,
      courseFees: input.courseFees,
      courseDuration: input.courseDuration,
      courseStartDate: input.courseStartDate,
    });

    const resultData = await result.save();
    return res.status(201).json({
      success: true,
      data: resultData,
    });
  } catch (err) {
    return res.status(400).json({
      success: false,
      message: err.message,
    });
  }
}

async function updateCourse(req, res) {
  try {
    const courseId = req.params.id;
    const input = req.body;
    const result = await Course.findByIdAndUpdate(courseId, {
      courseName: input.courseName,
      capacity: input.capacity,
      courseFees: input.courseFees,
      courseDuration: input.courseDuration,
      courseStartDate: input.courseStartDate,
    });
    return res.status(200).json(
      {
        success: true,
        data: result,
      },
      { new: true }
    );
  } catch (err) {
    return res.status(400).json({
      success: false,
      message: err.message,
    });
  }
}

async function deleteCourse(req, res) {
  try {
    const courseId = req.params.id;
    await Course.findByIdAndDelete(courseId);
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
  getCourse,
  getCourseById,
  addCourse,
  updateCourse,
  deleteCourse,
  getCourseByTeacherId,
};
