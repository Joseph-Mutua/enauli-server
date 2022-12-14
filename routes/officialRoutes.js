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
router.post("/official", create);
router.get("/officials", list);
router.get("/official/:slug", read);
router.put("/official/:slug", update);
router.delete("/official/:slug", remove);


module.exports = router;
