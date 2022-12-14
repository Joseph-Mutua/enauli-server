const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;

const operatorSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      required: true,
      minlength: [2, "Too short!"],
      maxlength: [32, "Too long"],
    },
    phoneNumber: {
      type: String,
      trim: true,
      required: true,
    },
    parent: { type: ObjectId, ref: "Vehicle", required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Vehicle", operatorSchema);
