const express = require("express");
const router = express.Router();

router.use("/teacher", require("./teacherRoutes"));
router.use("/student", require("./studentRoutes"));
router.use("/course", require("./courseRoutes"));
router.use("/enrolled", require("./enrolledRoutes"));

module.exports = router;