const { body, validationResult } = require("express-validator");
const User = require("../models/User");

const errorHandler = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ success: false, errors: errors.array() });
  }
  next();
};

const signupValidator = [
  body("name").notEmpty().withMessage("Name is required"),
  body("email").isEmail().withMessage("Invalid email address"),
  body("email").custom(async (value) => {
    const user = await User.findOne({email: value});
    if (user) {
      throw new Error("E-mail already in use");
    }
  }),
  body("password")
    .isLength({ min: 6 })
    .withMessage("Password is required and min 6 characters"),
  errorHandler,
];

const loginValidator = [
  body("email").isEmail().withMessage("Invalid email"),
  body("password").notEmpty().withMessage("Password is required"),
  errorHandler,
];

module.exports = {
  signupValidator,
  loginValidator,
};
