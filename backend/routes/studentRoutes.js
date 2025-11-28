const express = require("express");
const router = express.Router();
const {
  getStudent,
  getStudentById,
  addStudent,
  deleteStudent,
  updateStudent,
  updateFees,
} = require("../controllers/studentController");
const {
  addValidator,
  updateValidator,
} = require("../middlewares/studentValidator");
router.get("/", getStudent);
router.get("/:id", getStudentById);
router.post("/", addValidator, addStudent);
router.put("/:id", updateValidator, updateStudent);
router.patch("/:id/:type", updateFees);
router.delete("/:id", deleteStudent);
// router.post("/login", checkUser)

module.exports = router;
