const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;

const stationSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      required: true,
      minlength: [2, "Too short!"],
      maxlength: [32, "Too long"],
    },
    location: {
      type: String,
      trim: true,
      required: true,
    },
    slug: {
      type: String,
      unique: true,
      lowercase: true,
      index: true,
    },
    parent: { type: ObjectId, ref: "Sacco", },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Station", stationSchema);
