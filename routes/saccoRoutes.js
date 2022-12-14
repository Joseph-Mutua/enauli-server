const express = require("express");
const router = express.Router();

//Controller
const {
  create,
  read,
  update,
  remove,
  list,
  getOfficials,
  getStations,
  getVehicles,
} = require("../controllers/sacco");
const { getBalance } = require("../controllers/balance");

//Routes
router.post("/sacco", create);
router.get("/saccos", list);
router.get("/sacco/:slug", read);
router.put("/sacco/:slug", update);
router.delete("/sacco/:slug", remove);
router.get("/sacco/officials/:_id", getOfficials);
router.get("/sacco/stations/:_id", getStations);
router.get("/sacco/vehicles/:_id", getVehicles);
router.get("/sacco/balance/:_id", getBalance);

module.exports = router;
