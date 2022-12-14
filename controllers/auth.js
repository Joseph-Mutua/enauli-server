const jwt = require("jsonwebtoken");
const User = require("../models/user");



exports.signup = (req, res) => {
    console.log('REQ BODY ON SIGNUP', req.body);
    const { phoneNumber, password } = req.body;

    User.findOne({ phoneNumber }).exec((err, user) => {
        if (user) {
            return res.status(400).json({
                error: 'User with that Phone number Already Exists!'
            });
        }
    });

    let newUser = new User({ phoneNumber, password });

    newUser.save((err, success) => {
        if (err) {
            console.log('SIGNUP ERROR', err);
            return res.status(400).json({
                error: err
            });
        }
        res.json({
            message: 'Signup success! Please signin'
        });
    });
};

exports.signin = (req, res) => {
  console.log(req.body);
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

exports.read = (req, res) => {
  const userId = req.params.id;
  User.findById(userId).exec((err, user) => {
    if (err || !user) {
      return res.status(400).json({
        error: "User not found",
      });
    }
    user.hashed_password = undefined;
    user.salt = undefined;
    res.json(user);
  });
};

exports.update = (req, res) => {
  // console.log('UPDATE USER - req.user', req.user, 'UPDATE DATA', req.body);
  const { password, userId } = req.body;

  User.findOne({ _id: userId }, (err, user) => {
    if (err || !user) {
      return res.status(400).json({
        error: "User not found",
      });
    }
    if (password) {
      if (password.length < 4) {
        return res.status(400).json({
          error: "Password should be min 4 characters long",
        });
      } else {
        user.password = password;
      }
    }

    user.save((err, updatedUser) => {
      if (err) {
        console.log("USER UPDATE ERROR", err);
        return res.status(400).json({
          error: "User update failed",
        });
      }
      updatedUser.hashed_password = undefined;
      updatedUser.salt = undefined;
      res.json(updatedUser);
    });
  });
};
