const { body, validationResult } = require("express-validator");

const errorHandler = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ success: false, errors: errors.array() });
  }
  next();
};

const addValidator = [
  body("studentId").notEmpty().withMessage("Student is required"),
  body("courseId").notEmpty().withMessage("Course is required"),
  errorHandler,
];

const updateValidator = [
  body("studentId").notEmpty().withMessage("Student is required"),
  body("courseId").notEmpty().withMessage("Course is required"),
  errorHandler,
];

module.exports = {
  addValidator,
  updateValidator,
};
