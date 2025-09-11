const express = require("express");
const router = express.Router();

router.use("/teacher", require("./teacherRoutes"));
router.use("/student", require("./studentRoutes"));

module.exports = router;