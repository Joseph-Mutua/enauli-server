const Charge = require("../models/charge");
const slugify = require("slugify");

exports.create = async (req, res) => {
  try {
    const { type, amount } = req.body;
    const charge = await new Charge({
      type,
      amount,
      slug: slugify(type).toLowerCase(),
    }).save();
    res.json(charge);
  } catch (err) {
    console.log(err.message);
    res.status(400).send("Create Charge Failed");
  }
};


exports.update = async (req, res) => {
  const { type, amount } = req.body;

  try {
    const updated = await Station.findOneAndUpdate(
      { slug: req.params.slug },
      { type, amount, slug: slugify(type) },
      { new: true }
    );
    res.json(updated);
  } catch (err) {
    console.log(err);
    res.status(400).send("Station update failed!");
  }
  //
};


