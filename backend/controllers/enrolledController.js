const EnrolledCourse = require("../models/EnrolledCourse");
const nodemailer = require("nodemailer");

async function getEnrolledCourse(req, res) {
  try {
    // const result = await EnrolledCourse.find({}).populate("studentId").populate("courseId");

    const result = await EnrolledCourse.aggregate([
      {
        $lookup: {
          from: "students",
          localField: "studentId",
          foreignField: "_id",
          as: "StudentDetails",
        },
      },
      {
        $lookup: {
          from: "courses",
          localField: "courseId",
          foreignField: "_id",
          as: "CourseDetails",
        },
      },
    ]);
    return res.status(200).json({
      success: true,
      data: result,
    });
  } catch (err) {
    return res.status(400).json({
      success: false,
      message: err.message,
    });
  }
}

async function getEnrolledCourseById(req, res) {
  try {
    const enrolledId = req.params.id;
    const result = await EnrolledCourse.findById(enrolledId);
    return res.status(200).json({
      success: true,
      data: result,
    });
  } catch (err) {
    return res.status(400).json({
      success: false,
      message: err.message,
    });
  }
}

async function addEnrolledCourse(req, res) {
  try {
    const input = req.body;
    const result = await EnrolledCourse.create({
      studentId: input.studentId,
      courseId: input.courseId,
    });
    const resultData = await result.save();
    try {
      const enrolledData = await EnrolledCourse.findById(
        resultData._id
      ).populate("studentId");
      const studentEmail = enrolledData.studentId.email;
      // console.log("This is student Email", studentEmail);
       const testAccount = await nodemailer.createTestAccount();
      // console.log("this is testaccount",testAccount)
      const transporter =  nodemailer.createTransport({
        host: testAccount.smtp.host,
        port: testAccount.smtp.port,
        secure: testAccount.smtp.secure,
        auth: {
          user: testAccount.user,
          pass: testAccount.pass,
        },
      });
      const info = await transporter.sendMail({
        from: '"Abc School" <abcSchool@email.com>',
        to: studentEmail,
        subject: "Addmission Confirmation",
        text: "Thanks for getting addmission in my School , This is your Addmission confirmation",
        html: "<br>Thanks for getting addmission in my School , This is your Addmission confirmation</br>",
      });
      console.log("Message sent: %s", info.messageId);
      console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
    } catch (error) {
      console.log("This is error ", error);
    }

    return res.status(201).json({
      success: true,
      data: resultData,
    });
  } catch (err) {
    return res.status(400).json({
      success: false,
      message: err.message,
    });
  }
}

async function updateEnrolledCourse(req, res) {
  try {
    const enrolledId = req.params.id;
    const input = req.body;
    const result = await EnrolledCourse.findByIdAndUpdate(enrolledId, {
      studentId: input.studentId,
      courseId: input.courseId,
    });
    return res.status(200).json(
      {
        success: true,
        data: result,
      },
      { new: true }
    );
  } catch (err) {
    return res.status(400).json({
      success: false,
      message: err.message,
    });
  }
}

async function deleteEnrolledCourse(req, res) {
  try {
    const enrolledId = req.params.id;
    await EnrolledCourse.findByIdAndDelete(enrolledId);
    return res.status(200).json({
      success: true,
    });
  } catch (err) {
    return res.status(400).json({
      success: false,
      message: err.message,
    });
  }
}

module.exports = {
  getEnrolledCourse,
  deleteEnrolledCourse,
  getEnrolledCourseById,
  updateEnrolledCourse,
  addEnrolledCourse,
};
