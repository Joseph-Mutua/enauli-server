const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const _ = require("lodash");
const otpGenerator = require("otp-generator");

const User = require("../models/user");
const Otp = require("../models/otp");

const twilioAccountSid = process.env.TWILIO_SID;
const twilioAuthToken = process.env.TWILIO_AUTH_TOKEN;
const client = require("twilio")(twilioAccountSid, twilioAuthToken);

exports.signup = (req, res) => {
  console.log("REQ BODY ON SIGNUP", req.body);
  const { phoneNumber, password } = req.body;

  User.findOne({ phoneNumber }).exec((err, user) => {
    if (user) {
      return res.status(400).json({
        error: "User with that Phone number Already Exists!",
      });
    }
  });

  let newUser = new User({ phoneNumber, password });

  newUser.save((err, success) => {
    if (err) {
      console.log("SIGNUP ERROR", err);
      return res.status(400).json({
        error: err,
      });
    }
    return res.json({
      message: "Signup success! Please signin",
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

exports.forgotPassword = async (req, res) => {
  const user = await User.findOne({
    phoneNumber: req.body.phoneNumber,
  });
  const OTP = otpGenerator.generate(6, {
    digits: true,
    alphabets: false,
    upperCase: false,
    specialChars: false,
  });

  const phoneNumber = req.body.phoneNumber;

  client.messages
    .create({
      body: `Your verification code is: ${OTP}`,
      messagingServiceSid: "MG74b4e4f0f680fb0d779a4dd046bf13ae",
      to: `${phoneNumber}`,
    })
    .then((message) => console.log(message.sid))
    .catch((err) => {
      console.log(err);
    })
    .done();
  const otp = new Otp({ phoneNumber: phoneNumber, otp: OTP });
  const salt = await bcrypt.genSalt(10);
  otp.otp = await bcrypt.hash(otp.otp, salt);
  const result = await otp.save();
  return res.status(200).send("Otp send successfully!");
};

exports.resetPassword = async (req, res) => {
  const { phoneNumber, password } = req.body;
  const otpHolder = await Otp.find({
    phoneNumber,
  });
  if (otpHolder.length === 0)
    return res.status(400).send("You use an Expired OTP!");
  const rightOtpFind = otpHolder[otpHolder.length - 1];
  const validUser = await bcrypt.compare(req.body.otp, rightOtpFind.otp);

  if (rightOtpFind.phoneNumber === req.body.phoneNumber && validUser) {
    if (password) {
      if (password.length < 4) {
        return res.status(400).json({
          error: "Password should be min 4 characters long",
        });
      } else {
        rightOtpFind.password = password;
      }
    }

    rightOtpFind.save((err, updatedUser) => {
      if (err) {
        console.log("PASSWORD REST ERROR ERROR", err);
        return res.status(400).json({
          error: "Password Reset Failed",
        });
      }
      updatedUser.hashed_password = undefined;
      updatedUser.salt = undefined;

      Otp.deleteMany({
        phoneNumber: rightOtpFind.phoneNumber,
      });
      res.json(updatedUser);
    });
  } else {
    return res.status(400).send("Your OTP was wrong!");
  }
};
