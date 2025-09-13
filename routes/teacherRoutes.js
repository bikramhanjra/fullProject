const express = require("express");
const router = express.Router();
const {
  getTeacher,
  getTeacherById,
  addTeacher,
  deleteTeacher,
  updateTeacher,
} = require("../controllers/TeacherController");

router.get("/", getTeacher);
router.get("/:id", getTeacherById);
router.post("/",addTeacher );
router.put("/:id", updateTeacher);
router.delete("/:id", deleteTeacher);

module.exports = router;