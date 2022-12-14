const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;

const balanceSchema = new mongoose.Schema(
  {
    amount: {
      type: Number,
      default: 0.0,
    },

    parent: { type: ObjectId, ref: "Sacco", required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Balance", balanceSchema);
