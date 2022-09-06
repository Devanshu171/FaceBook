const express = require("express");

const router = express.Router();
const { home, register } = require("../controllers/user");
router.get("/user", home);
router.post("/register", register);

module.exports = router;
