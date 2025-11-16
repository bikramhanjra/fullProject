const mongoose = require("mongoose");
const User = require("../models/User");
const bcrypt = require("bcrypt");

const addUser = async (req, res) => {
  try {
    const userInput = req.body;
    console.log("this is userInput", userInput); 
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(userInput.password, saltRounds);
    const result = await User.create({
      name: userInput.name,
      email: userInput.email,
      password: hashedPassword,
    });
    res.status(200).json({
      status: true,
      data: result,
    });
  } catch (error) {
    console.log("this is error", error);
    return res.status(400).json({
      status: false,
      message: error.message,
    });
  }
}; 

const checkUser = async (req, res) => {
  try {
    const userInput = req.body;
    console.log("this is userInput", userInput);
    const user = await User.findOne({ email: userInput.email });

    if (!user) {
      throw new Error("No Account Exists");
    }

    const passwordMatch = await bcrypt.compare(userInput.password, user.password);

    if (!passwordMatch) {
      throw new Error("Password is Incorrect");
    }

    res.status(200).json({
      success: true,
      data: user,
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
