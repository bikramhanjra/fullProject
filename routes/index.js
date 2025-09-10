const express = require("express");
const router = express.Router();

router.use("/teacher", require("./teacherRoutes"));

module.exports = router;