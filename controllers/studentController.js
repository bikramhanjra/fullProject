const Student = require("../models/Student");

async function getStudent(req, res) {
  try {
    let { status, sortField, sortType } = req.query;

    if (sortType) {
      if (sortType !== "low" && sortType !== "high") {
        throw new Error("Only Low and High is allowed");
      }
    }
    sortType = sortType === "high" ? -1 : 1;

    if (status) {
      if (status !== "active" && status !== "inActive") {
        throw new Error("Status value is invalid");
      }
    }

    let where = {};

    if (status) {
      where = { status };
    }
    // const result = await Student.find(where).sort({ [sortField]: sortType });
    const newResult = await Student.aggregate([
      { $match: where },
      { $sort: { [sortField]: sortType } },
    ]);

    return res.status(200).json({
      success: true,
      data: newResult,
    });
  } catch (err) {
    return res.status(400).json({
      success: false,
      message: err.message,
    });
  }
}

async function getStudentById(req, res) {
  try {
    const studentId = req.params.id;
    const result = await Student.findById(studentId);
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

async function isValidate(input) {
  if (!input.email) {
    return { isValid: false, message: "email is required" };
  }
  if (!input.dob) {
    return { isValid: false, message: "Dob is required" };
  }
  const emailExists = await Student.findOne({email: input.email});
  console.log(emailExists);
  if (emailExists) {
    return { isValid: false, message: "Student Allready exists" };
  }
  return { isValid: true, message: "Requirements are fullfilled" };
}

async function addStudent(req, res) {
  try {
    const input = req.body;
    const validation = await isValidate(input);

    if (!validation.isValid) {
      throw new Error(validation.message);
    }

    const result = await Student.create({
      name: input.name,
      dob: input.dob,
      email: input.email,
      status: input.status,
      password: input.password,
      feesPaid: input.feesPaid,
    });

    return res.status(201).json({
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

async function updateStudent(req, res) {
  try {
    const studentId = req.params.id;
    const input = req.body;
    const result = await Student.findByIdAndUpdate(
      studentId,
      {
        name: input.name,
        dob: input.dob,
        email: input.email,
        password: input.password,
        feesPaid: input.feesPaid,
      },
      { new: true }
    );
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

async function deleteStudent(req, res) {
  try {
    const studentId = req.params.id;
    await Student.findByIdAndDelete(studentId);
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

async function updateFees(req, res) {
  try {
    const studentId = req.params.id;
    const type = req.params.type;
    let { feesPaid } = req.body;

    if (type === "deposit") {
      feesPaid = feesPaid;
    } else if (type === "withdraw") {
      feesPaid = -feesPaid;
    } else {
      throw new Error("Parameter is Invalid");
    }
    const result = await Student.findByIdAndUpdate(
      studentId,
      {
        $inc: { feesPaid: feesPaid },
      },
      { new: true }
    );

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

module.exports = {
  getStudent,
  getStudentById,
  addStudent,
  updateStudent,
  deleteStudent,
  updateFees,
};

// function isStatusValidate(status) {
//       if (status !== "active" && status !== "inActive") {
//         return { message: "You can only pass active and inActive" };
//       }
//       return
//     }
