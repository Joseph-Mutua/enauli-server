const Vehicle = require("../models/vehicle");
const Operator = require("../models/operator");
const slugify = require("slugify");

exports.create = async (req, res) => {
  try {
    const { model, numberPlate } = req.body;
    const vehicle = await new Vehicle({
      model,
      numberPlate,
      slug: slugify(model).toLowerCase(),
    }).save();
    res.json(vehicle);
  } catch (err) {
    console.log(err.message);
    res.status(400).send("Create Vehicle failed");
  }
};

exports.list = async (req, res) => {
  res.json(await Vehicle.find({}).sort({ createdAt: -1 }).exec());
  //
};

exports.read = async (req, res) => {
  let vehicle = await Vehicle.findOne({ slug: req.params.slug }).exec();

  res.json({ vehicle });
};

exports.update = async (req, res) => {
  const { model, numberPlate } = req.body;

  try {
    const updated = await Vehicle.findOneAndUpdate(
      { slug: req.params.slug },
      { model, numberPlate, slug: slugify(model) },
      { new: true }
    );
    res.json(updated);
  } catch (err) {
    console.log(err);
    res.status(400).send("Vehicle update failed!");
  }
  //
};

exports.remove = async (req, res) => {
  try {
    const deleted = await Vehicle.findOneAndDelete({ slug: req.params.slug });
    res.json(deleted);
  } catch (err) {
    console.log(err);
    res.status(400).send("Vehicle delete failed!");
  }
};
exports.getOperators = (req, res) => {
  Operator.find({ parent: req.params._id }).exec((err, operators) => {
    if (err) console.log(err);
    res.json(operators);
    console.log(operators);
  });
};