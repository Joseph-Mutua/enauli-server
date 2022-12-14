const express = require("express");
const router = express.Router();

const { signup, signin, read, update } = require("../controllers/auth");

router.post("/sign-up", signup);
router.post("/sign-in", signin);
router.get("/user/:id", read);
router.put("/user/update", update);
module.exports = router;
