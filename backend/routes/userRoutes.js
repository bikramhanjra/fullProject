const express = require("express")
const router = express.Router()

const {addUser, checkUser} = require("../controllers/userController")

router.post("/", addUser)
router.post("/login", checkUser)
module.exports = router; 