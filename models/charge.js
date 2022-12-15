const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;

const chargeSchema = new mongoose.Schema(
  {
    type: {
      type: String,
      trim: true,
      required: true,
    },
    amount: {
      type: Number,
      default: 0.0,
    },
    parent: { type: ObjectId, ref: "Sacco" },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Charge", chargeSchema);
