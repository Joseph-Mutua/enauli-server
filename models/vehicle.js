const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;

const vehicleSchema = new mongoose.Schema(
  {
    model: {
      type: String,
      trim: true,
      required: true,
    },
    numberPlate: {
      type: String,
      required: true,
    },
    slug: {
      type: String,
      unique: true,
      lowercase: true,
      index: true,
    },
    parent: { type: ObjectId, ref: "Sacco" },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Vehicle", vehicleSchema);
