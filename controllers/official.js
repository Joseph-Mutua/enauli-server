const Official = require("../models/official");
const slugify = require("slugify");

exports.create = async (req, res) => {
  try {
    const { name, phoneNumber } = req.body;
    const official = await new Official({
      name,
      phoneNumber,
      slug: slugify(name).toLowerCase(),
    }).save();
    res.json(official);
  } catch (err) {
    console.log(err.message);
    res.status(400).send("Create official failed");
  }
};

exports.list = async (req, res) => {
  res.json(await Official.find({}).sort({ createdAt: -1 }).exec());
  //
};

exports.read = async (req, res) => {
  let official = await Official.findOne({ slug: req.params.slug }).exec();

  res.json({ official });
};

exports.update = async (req, res) => {
  const { name, phoneNumber } = req.body;

  try {
    const updated = await Official.findOneAndUpdate(
      { slug: req.params.slug },
      { name, phoneNumber, slug: slugify(name) },
      { new: true }
    );
    res.json(updated);
  } catch (err) {
    console.log(err);
    res.status(400).send("Official update failed!");
  }
  //
};

exports.remove = async (req, res) => {
  try {
    const deleted = await Official.findOneAndDelete({ slug: req.params.slug });
    res.json(deleted);
  } catch (err) {
    console.log(err);
    res.status(400).send("Official delete failed!");
  }
};
