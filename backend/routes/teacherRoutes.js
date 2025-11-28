const express = require("express");
const router = express.Router();
const {
  getTeacher,
  getTeacherById,
  addTeacher,
  deleteTeacher,
  updateTeacher,
} = require("../controllers/teacherController");
const {
  addValidator,
  updateValidator,
} = require("../middlewares/teacherValidator");

router.get("/", getTeacher);
router.get("/:id", getTeacherById);
router.post("/", addValidator, addTeacher);
router.put("/:id", updateValidator, updateTeacher);
router.delete("/:id", deleteTeacher);

module.exports = router;
