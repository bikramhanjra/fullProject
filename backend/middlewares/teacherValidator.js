const { body, validationResult } = require("express-validator");
const Teacher = require("../models/Teacher");

const errorHandler = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ success: false, errors: errors.array() });
  }
  next();
};

const addValidator = [
  body("email").notEmpty().withMessage("Email is required"),
  body("email").isEmail().withMessage("Invalid email address"),
  body("dob").notEmpty().withMessage("Dob is Required"),
  body("email").custom(async (value) => {
    const teacher = await Teacher.findOne({ email: value });

    if (teacher) {
      throw new Error("Teacher Allready Exists");
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