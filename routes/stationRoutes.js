const express = require("express");
const router = express.Router();

//Controller
const {
  create,
  read,
  update,
  remove,
  list,
} = require("../controllers/station");

//Routes
router.post("/station", create);
router.get("/stations", list);
router.get("/station/:slug", read);
router.put("/station/:slug", update);
router.delete("/station/:slug", remove);

module.exports = router;
