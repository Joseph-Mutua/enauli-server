const express = require("express");
const router = express.Router();

//Controller
const {
  create,
  update,
} = require("../controllers/charge");

//Routes
router.post("/charge", create);
router.put("/charge/:slug", update);


module.exports = router;