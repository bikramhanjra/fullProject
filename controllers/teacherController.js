const Teacher = require("../models/Teacher");

async function getTeacher(req, res) {
  try {
    const result = await Teacher.find({});
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

async function addTeacher(req, res) {
  try {
    const body = req.body;
    const result = await Teacher.create({
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

async function updateTeacher(req, res) {
    try{
        const teacherId = req.params.id;
        const body = req.body;
        const result = await Teacher.findByIdAndUpdate(teacherId, {
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

async function deleteTeacher(req, res) {
  try {
    const teacherId = req.params.id;
    await Teacher.findByIdAndDelete(teacherId);
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
  getTeacher,
  addTeacher,
  updateTeacher,
  deleteTeacher,
};