
const jwt = require("jsonwebtoken");
const User = require("../models/user");

exports.signup = () => (req, res) => {
  const { phoneNumber, password } = req.body;

  User.findOne({ phoneNumber }).exec((err, user) => {
    if (user) {
      return res.status(400).json({
        error: "User already exists!",
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

exports.signin = (req, res) => {
  const { phoneNumber, password } = req.body;

  // Check if user exists
  User.findOne({ phoneNumber }).exec((err, user) => {
    if (err || !user) {
      return res.status(400).json({
        error: "User with that Phone Number does not Exist. Please Sign Up.",
      });
    }
    if (!user.authenticate(password)) {
      return res.status(400).json({
        error: "Phone Number and Password Do Not Match",
      });
    } //   Generate token and send to Client
    const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });
    const { _id, phoneNumber } = user;

    return res.json({
      token,
      user: { _id, phoneNumber },
    });
  });
};
