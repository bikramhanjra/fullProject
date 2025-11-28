const express = require("express");
const router = express.Router();
const {
  getCourse,
  getCourseById,
  addCourse,
  deleteCourse,
  updateCourse,
  getCourseByTeacherId,
} = require("../controllers/courseController");
const {
  addValidator,
  updateValidator,
} = require("../middlewares/courseValidator");

router.get("/", getCourse);
router.get("/:id", getCourseById);
router.get("/teacherId/:id", getCourseByTeacherId);
router.post("/", addValidator, addCourse);
router.put("/:id", updateValidator, updateCourse);
router.delete("/:id", deleteCourse);

module.exports = router;
