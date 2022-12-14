const Station = require("../models/station");
const slugify = require("slugify");

exports.create = async (req, res) => {
  try {
    const { name, location } = req.body;
    const station = await new Station({
      name,
      location,
      slug: slugify(name).toLowerCase(),
    }).save();
    res.json(station);
  } catch (err) {
    console.log(err.message);
    res.status(400).send("Create Station failed");
  }
};

exports.list = async (req, res) => {
  res.json(await Station.find({}).sort({ createdAt: -1 }).exec());
  //
};

exports.read = async (req, res) => {
  let station = await Station.findOne({ slug: req.params.slug }).exec();

  res.json({ station });
};

exports.update = async (req, res) => {
  const { name, location } = req.body;

  try {
    const updated = await Station.findOneAndUpdate(
      { slug: req.params.slug },
      { name, location, slug: slugify(name) },
      { new: true }
    );
    res.json(updated);
  } catch (err) {
    console.log(err);
    res.status(400).send("Station update failed!");
  }
  //
};

exports.remove = async (req, res) => {
  try {
    const deleted = await Station.findOneAndDelete({ slug: req.params.slug });
    res.json(deleted);
  } catch (err) {
    console.log(err);
    res.status(400).send("Station delete failed!");
  }
};
