const mongoose = require("mongoose");

const StudentSchema = new mongoose.Schema({
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

const Student = mongoose.model("Student", StudentSchema);
module.exports = Student;