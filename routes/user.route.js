const express = require("express");
const router = express.Router();

const {register, login, getProfile, updateProfile} = require("../controllers/user.controller");
const { verifyTokenUser } = require("../middleware/user.auth");

router.post("/register", register)
router.post("/login", login)
router.get("/getProfile", verifyTokenUser, getProfile)
router.put("/updateProfile/:id", verifyTokenUser ,updateProfile)

module.exports = router;
