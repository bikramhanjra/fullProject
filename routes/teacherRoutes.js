const express = require("express");
const router = express.Router();
const {
  getTeacher,
  addTeacher,
  deleteTeacher,
  updateTeacher,
} = require("../controllers/TeacherController");

router.get("/", getTeacher);
router.post("/",addTeacher );
router.put("/:id", updateTeacher);
router.delete("/:id", deleteTeacher);

module.exports = router;