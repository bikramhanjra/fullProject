const EnrolledCourse = require("../models/EnrolledCourse");

async function getEnrolledCourse(req, res) {
  try {
    // const result = await EnrolledCourse.find({}).populate("studentId").populate("courseId");

     const result = await EnrolledCourse.aggregate([
      {
        $lookup: {
          from: "students",
          localField: "studentId",
          foreignField: "_id",
          as: "StudentDetails",
        },
      },
      {
        $lookup: {
          from: "courses",
          localField: "courseId",
          foreignField: "_id",
          as: "CourseDetails",
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

async function getEnrolledCourseById(req, res) {
  try {
    const enrolledId = req.params.id;
    const result = await EnrolledCourse.findById(enrolledId);
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

async function addEnrolledCourse(req, res) {
  try {
    const input = req.body;
    const result = await EnrolledCourse.create({
      studentId: input.studentId,
      courseId: input.courseId,
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

async function updateEnrolledCourse(req, res) {
  try {
    const enrolledId = req.params.id;
    const input = req.body;
    const result = await EnrolledCourse.findByIdAndUpdate(enrolledId, {
      studentId: input.studentId,
      courseId: input.courseId,
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

async function deleteEnrolledCourse(req, res) {
  try {
    const enrolledId = req.params.id;
    await EnrolledCourse.findByIdAndDelete(enrolledId);
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
  getEnrolledCourse,
  deleteEnrolledCourse,
  getEnrolledCourseById,
  updateEnrolledCourse,
  addEnrolledCourse,
};
