const mongoose = require("mongoose");
const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const key = process.env.JWTSECRETS;
const addUser = async (req, res) => {
  try {
    const userInput = req.body;
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(userInput.password, saltRounds);
    const result = await User.create({
      name: userInput.name,
      email: userInput.email,
      password: hashedPassword,
    });
    res.status(200).json({
      success: true,
      data: result,
    });
  } catch (error) {
    console.log("this is error", error);
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

const checkUser = async (req, res) => {
  try {
    const userInput = req.body;
    const user = await User.findOne({ email: userInput.email });

    if (!user) {
      throw new Error("No Account Exists");
    }

    const passwordMatch = await bcrypt.compare(
      userInput.password,
      user.password
    );

    if (!passwordMatch) {
      throw new Error("Password is Incorrect");
    }

    const token = jwt.sign({ id: user._id }, key  , { expiresIn: "2d" });
    res.status(200).json({
      success: true,
      data: token,
    });
  } catch (error) {
    console.log("this is error", error);
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  addUser,
  checkUser,
};
