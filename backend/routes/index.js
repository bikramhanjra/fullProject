const express = require("express");
const router = express.Router();
const  auth  = require("../middlewares/auth");
router.use("/teacher", auth, require("./teacherRoutes"));
router.use("/student", auth, require("./studentRoutes"));
router.use("/user", require("./userRoutes"));
router.use("/course", auth, require("./courseRoutes"));
router.use("/enrolled", auth, require("./enrolledRoutes"));

module.exports = router;
