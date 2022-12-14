const express = require("express");
const router = express.Router();

const {
  signup,
  signin,
  read,
  update,
  forgotPassword,
  resetPassword,
} = require("../controllers/auth");

router.post("/sign-up", signup);
router.post("/sign-in", signin);
router.get("/user/:id", read);
router.put("/user/update", update);
router.post("/user/forgot-password", forgotPassword);
router.post("/user/reset-password", resetPassword);

module.exports = router;
