const express = require("express");
const router = express.Router();
const { addUser, checkUser } = require("../controllers/userController");
const {
  signupValidator,
  loginValidator,
} = require("../middlewares/userValidator");

router.post("/", signupValidator, addUser);
router.post("/login", loginValidator,checkUser);
module.exports = router;
