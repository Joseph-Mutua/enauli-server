const { response } = require("express");

const User = require("../models/user");

exports.signup = () => (req, res) => {
  const { phoneNumber, password } = req.body;

  User.findOne({ phoneNumber }).exec((err, user) => {
    if (user) {
      return res.status(400).json({
        error: "User alredy exists!",
      });
    }
  });

  let newUser = new User({ phoneNumber, password });

  newUser.save((err, success) => {
    if (err) {
      console.log("SIGN UP ERROR", err);
      return res.status(400).json({
        error: err,
      });
    }
    response.json({ user: newUser });
  });
};
