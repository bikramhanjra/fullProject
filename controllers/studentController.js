const User = require("../models/Student");

async function getStudent(req, res) {
  try {
    const result = await User.find({});
    return res.status(200).json({
      status: "Success",
      data: result,
    });
  } catch (err) {
    return res.status(500).json({
      status: "Error",
      message: err.message,
    });
  }
}

async function addStudent(req, res) {
  try {
    const body = req.body;
    const result = await User.create({
      name: body.name,
      age: body.age,
      email: body.email,
    });
    return res.status(201).json({
      status: "Created",
      data: result,
    });
  } catch (err) {
    return res.status(500).json({
      status: "Error",
      message: err.message,
    });
  }
}

async function updateStudent(req, res) {
    try{
        const studentId = req.params.id;
        const body = req.body;
        const result = await User.findByIdAndUpdate(studentId, {
            name:body.name,
            age:body.age,
            email:body.email,
        });
        return res.status(200).json({
            status:"Success",
            data:result,
        }, {new:true});
    }catch(err){
        return res.status(500).json({
            status:"Error",
            message:err.message,
        });
    };
};

async function deleteStudent(req, res) {
  try {
    const studentId = req.params.id;
    await User.findByIdAndDelete(studentId);
    return res.status(200).json({
        status:"Deleted",
    });
  } catch (err) {
    return res.status(500).json({
        status:"Error",
        message:err.message,
    });
  };
};

module.exports = {
  getStudent,
  addStudent,
  updateStudent,
  deleteStudent,
};