const express = require("express");
const router = express.Router();
const {
  getStudent,
  getStudentById,
  addStudent,
  deleteStudent,
  updateStudent,
  updateFees,
  getSortedStudents,
  getStudentStatus
} = require("../controllers/studentController");

router.get("/", getStudent);
router.get("/sorted", getSortedStudents)
router.get("/:status", getStudentStatus)
router.get("/:id", getStudentById);
router.post("/",addStudent );
router.put("/:id", updateStudent);
router.patch("/:id/:type", updateFees)
router.delete("/:id", deleteStudent);

module.exports = router;