const mongoose = require("mongoose");

const TeacherSchema = new mongoose.Schema({
    name:{
        type:String,
    },
    age:{
        type:Number,
    },
    email:{
        type:String,
    },
});

const Teacher = mongoose.model("Teacher", TeacherSchema);
module.exports = Teacher;