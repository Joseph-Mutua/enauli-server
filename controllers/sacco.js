const Sacco = require("../models/sacco");
const Official = require("../models/official");
const Station = require("../models/station");
const Vehicle = require("../models/vehicle");
const Balance = require("../models/balance");
const slugify = require("slugify");

exports.create = async (req, res) => {
  try {
    const { name } = req.body;
    const sacco = await new Sacco({
      name,
      slug: slugify(name).toLowerCase(),
    }).save();
    res.json(sacco);
  } catch (err) {
    console.log(err.message);
    res.status(400).send("Create sacco failed");
  }
};

exports.list = async (req, res) => {
  res.json(await Sacco.find({}).sort({ createdAt: -1 }).exec());
  //
};

exports.read = async (req, res) => {
  let sacco = await Sacco.findOne({ slug: req.params.slug }).exec();

  res.json({ sacco });
};

exports.update = async (req, res) => {
  const { name } = req.body;

  try {
    const updated = await Sacco.findOneAndUpdate(
      { slug: req.params.slug },
      { name, slug: slugify(name) },
      { new: true }
    );
    res.json(updated);
  } catch (err) {
    console.log(err);
    res.status(400).send("Sacco update failed!");
  }
  //
};

exports.remove = async (req, res) => {
  try {
    const deleted = await Sacco.findOneAndDelete({ slug: req.params.slug });
    res.json(deleted);
  } catch (err) {
    console.log(err);
    res.status(400).send("Sacco delete failed!");
  }
};

exports.getOfficials = (req, res) => {
  Official.find({ parent: req.params._id }).exec((err, officials) => {
    if (err) console.log(err);
    res.json(officials);
    console.log(officials);
  });
};

exports.getStations = (req, res) => {
  Station.find({ parent: req.params._id }).exec((err, stations) => {
    if (err) console.log(err);
    res.json(stations);
    console.log(stations);
  });
};

exports.getVehicles = (req, res) => {
  SubCategory.find({ parent: req.params._id }).exec((err, vehicles) => {
    if (err) console.log(err);
    res.json(vehicles);
    console.log(vehicles);
  });
};

exports.getBalance = (req, res) => {
  Balance.find({ parent: req.params._id }).exec((err, balance) => {
    if (err) console.log(err);
    res.json(balance);
    console.log(balance);
  });
};
exports.getVehicles = (req, res) => {
  Vehicle.find({ parent: req.params._id }).exec((err, vehicles) => {
    if (err) console.log(err);
    res.json(vehicles);
    console.log(vehicles);
  });
};