const express = require("express");
const router = express.Router();

//Controller
const {
  create,
  read,
  update,
  remove,
  list,
  getOperators
} = require("../controllers/vehicle");

//Routes
router.post("/vehicle", create);
router.get("/vehicles", list);
router.get("/vehicle/:slug", read);
router.put("/vehicle/:slug", update);
router.delete("/vehicle/:slug", remove);
router.get("/vehicles/operators/:_id", getOperators)


module.exports = router;
