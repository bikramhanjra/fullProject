const { body, validationResult } = require("express-validator");
const Student = require("../models/Student");

const errorHandler = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(402).json({ success: false, errors: errors.array() });
  }
  next();
};
const addValidator = [
  body("email").notEmpty().withMessage("Email is required"),
  body("email").isEmail().withMessage("Invalid email address"),
  body("dob").notEmpty().withMessage("Dob is Required"),
  body("email").custom(async (value) => {
    const student = await Student.findOne({ email: value });

    if (student) {
      throw new Error("Student Allready Exists");
    }
  }),
  errorHandler,
];

const updateValidator = [
  body("email").notEmpty().withMessage("Email is required"),
  body("email").isEmail().withMessage("Invalid email address"),
  body("dob").notEmpty().withMessage("Dob is Required"),
  errorHandler
];

module.exports = {
  addValidator,
  updateValidator,
};
