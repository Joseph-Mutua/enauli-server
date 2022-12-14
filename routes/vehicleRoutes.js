const express = require("express");
const router = express.Router();

//Controller
const {
  create,
  read,
  update,
  remove,
  list,
} = require("../controllers/official");

//Routes
router.post("/vehicle", create);
router.get("/vehicles", list);
router.get("/vehicle/:slug", read);
router.put("/vehicle/:slug", update);
router.delete("/vehicle/:slug", remove);

module.exports = router;
