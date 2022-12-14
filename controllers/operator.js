const Operator = require("../models/operator");
const slugify = require("slugify");

exports.create = async (req, res) => {
  try {
    const { name, phoneNumber } = req.body;
    const operator = await new Official({
      name,
      phoneNumber,
      slug: slugify(name).toLowerCase(),
    }).save();
    res.json(operator);
  } catch (err) {
    console.log(err.message);
    res.status(400).send("Create operator failed");
  }
};

exports.list = async (req, res) => {
  res.json(await Operator.find({}).sort({ createdAt: -1 }).exec());
  //
};

exports.read = async (req, res) => {
  let operator = await Operator.findOne({ slug: req.params.slug }).exec();

  res.json({ operator });
};

exports.update = async (req, res) => {
  const { name, phoneNumber } = req.body;

  try {
    const updated = await Operator.findOneAndUpdate(
      { slug: req.params.slug },
      { name, phoneNumber, slug: slugify(name) },
      { new: true }
    );
    res.json(updated);
  } catch (err) {
    console.log(err);
    res.status(400).send("Operator update failed!");
  }
  //
};

exports.remove = async (req, res) => {
  try {
    const deleted = await Operator.findOneAndDelete({ slug: req.params.slug });
    res.json(deleted);
  } catch (err) {
    console.log(err);
    res.status(400).send("Operator delete failed!");
  }
};
