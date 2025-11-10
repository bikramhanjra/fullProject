const { default: mongoose } = require("mongoose");
const User = require("../models/User");

const addUser = async (req, res) => {
  try {
    const userInput = req.body;
    console.log("this is userInput", userInput);
    const result = await User.create({
      name: userInput.name,
      email: userInput.email,
      password: userInput.password,
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
    const result = await User.findOne({email: userInput.email});
     
    if(!result){
        throw new Error("No Account Exists")
    }
    
    if(result.password !== userInput.password){
        throw new Error("Password is Incorrect")
    }

    console.log("thi si result ", result)
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

module.exports = {
  addUser,
  checkUser,
};
