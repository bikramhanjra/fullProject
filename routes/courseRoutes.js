const express = require("express");
const router = express.Router();
const {
  getCourse,
  getCourseById,
  addCourse,
  deleteCourse,
  updateCourse,
} = require("../controllers/courseController");

router.get("/", getCourse);
router.get("/:id", getCourseById);
router.post("/",addCourse );
router.put("/:id", updateCourse);
router.delete("/:id", deleteCourse);

module.exports = router;