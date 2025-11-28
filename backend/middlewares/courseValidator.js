const { body, validationResult } = require("express-validator");
const Course = require("../models/Course");
const errorHandler = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ success: false, errors: errors.array() });
  }
  next();
};

const addValidator = [
  body("courseName").notEmpty().withMessage("Course Name is required"),
  body("teacherId").notEmpty().withMessage("Teacher is Required"),
  body("courseDuration").notEmpty().withMessage("Course Duration is Required"),
  body("courseName").custom(async (value) => {
    const course = await Course.findOne({ courseName: value });

    if (course) {
      throw new Error("Course Allready Exists");
    }
  }),
  errorHandler,
];

const updateValidator = [
  body("courseName").notEmpty().withMessage("Course Name is required"),
  body("teacherId").notEmpty().withMessage("Teacher is Required"),
  body("courseDuration").notEmpty().withMessage("Course Duration is Required"),
  errorHandler,
];

module.exports = {
  addValidator,
  updateValidator,
};
