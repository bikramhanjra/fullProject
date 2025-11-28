const express = require("express");
const router = express.Router();
const {
  getEnrolledCourse,
  deleteEnrolledCourse,
  getEnrolledCourseById,
  updateEnrolledCourse,
  addEnrolledCourse,
} = require("../controllers/enrolledController");
const {addValidator, updateValidator} = require("../middlewares/enrolledValidator");

router.get("/", getEnrolledCourse);
router.get("/:id", getEnrolledCourseById);
router.post("/",addValidator, addEnrolledCourse);
router.put("/:id", updateValidator,updateEnrolledCourse);
router.delete("/:id",  deleteEnrolledCourse);

module.exports = router;
