const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;
const crypto = require("crypto");

// user Schema
const userSchema = new mongoose.Schema(
  {
    phoneNumber: {
      type: String,
      unique: true,
      trim: true,
      required: true,
    },
    hashed_password: {
      type: String,
      trim: true,
      required: true,
    },
    salt: String, //Define strength of the hashing
    saccos: [[{ type: ObjectId, ref: "Sacco" }]],
    resetPasswordLink: {
      data: String,
      default: "",
    },
  },
  { timestamps: true }
);

// Access virtual Schema
userSchema
  .virtual("password")
  .set(function (password) {
    this._password = password;
    this.salt = this.makeSalt();
    this.hashed_password = this.encryptPassword(password);
  })
  .get(function () {
    return this._password; //Return the hashed password to user schema
  });

//userSchema methods
userSchema.methods = {
  authenticate: function (plainText) {
    return this.encryptPassword(plainText) === this.hashed_password;
  },

  encryptPassword: function (password) {
    if (!password) return "";
    try {
      const hash = crypto
        .createHmac("sha1", this.salt)
        .update(password)
        .digest("hex")
        .console.log(hash);
    } catch (err) {
      return "";
    }
  },

  makeSalt: function () {
    return Math.round(new Date().valueOf() * Math.random());
  },
};

module.exports = mongoose.model("User", userSchema);
