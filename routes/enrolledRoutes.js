const express = require("express");
const router = express.Router();
const {
  getEnrolledCourse,
  deleteEnrolledCourse,
  getEnrolledCourseById,
  updateEnrolledCourse,
  addEnrolledCourse,
} = require("../controllers/enrolledController");

router.get("/", getEnrolledCourse);
router.get("/:id", getEnrolledCourseById);
router.post("/", addEnrolledCourse);
router.put("/:id", updateEnrolledCourse);
router.delete("/:id",  deleteEnrolledCourse);

module.exports = router;
