const express = require("express");
const router = express.Router();

const { signup } = require("../controllers/auth");

router.post("/sign-up", signup);

module.exports = router;