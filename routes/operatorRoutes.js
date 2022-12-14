const express = require("express");
const router = express.Router();

//Controller
const {
  create,
  read,
  update,
  remove,
  list,
} = require("../controllers/operator");

//Routes
router.post("/operator", create);
router.get("/operators", list);
router.get("/operator/:slug", read);
router.put("/operator/:slug", update);
router.delete("/operator/:slug", remove);

module.exports = router;
