const express = require("express");

const router = express.Router();


router.post("/sign-up", (req, res) => {
    res.json({data: "You just hit the Sign up endpoint"})
})

module.exports = router;