const Balance = require("../models/balance");


exports.getBalance = (req, res) => {
  Balance.find({ parent: req.params._id }).exec((err, balance) => {
    if (err) console.log(err);
    res.json(balance);
    console.log(balance);
  });
};
