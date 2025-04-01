const Unit = require("../models/unitModel");

const createUnit = async (req, res, next) => {
  try {
    const unit = new Unit(req.body);
    await unit.save();
    res.status(201).json({
      success: true,
      data: unit,
      message: "Unit created successfully",
    });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

const createManyUnit = async (req, res, next) => {
  try {
    const units = req.body;
    const createdUnits = await Unit.insertMany(units);
    res.status(201).json({
      success: true,
      data: createdUnits,
      message: "Units created successfully",
    });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

const updateUnit = async (req, res, next) => {
  try {
    const { unitID } = req.params;
    const unit = await Unit.findByIdAndUpdate(unitID, req.body, { new: true });
    if (!unit) {
      return res
        .status(404)
        .json({ success: false, message: "Unit not found" });
    }
    res.status(200).json({
      success: true,
      data: unit,
      message: "Unit updated successfully",
    });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

const searchUnit = async (req, res, next) => {
  try {
    const { keyword } = req.query;
    const units = await Unit.find({
      name: { $regex: keyword, $options: "i" },
    });
    res.status(200).json({
      success: true,
      data: units,
      message: `${units.length} units found`,
    });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

const filterByCourse = async (req, res, next) => {
  try {
    const { courseId } = req.query;
    const units = await Unit.find({ course: courseId });
    console.log(courseId);
    res.status(200).json({
      success: true,
      data: units,
      message: `${units.length} units found`,
    });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

const removeUnit = async (req, res, next) => {
  try {
    const { unitID } = req.params;
    await Unit.findByIdAndDelete(unitID);
    res.status(200).json({
      success: true,
      message: "Unit deleted successfully",
    });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

const getAllUnit = async (req, res, next) => {
  try {
    const units = await Unit.find();
    res.status(200).json({
      success: true,
      data: units,
      message: `${units.length} units found`,
    });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

module.exports = {
  createUnit,
  createManyUnit,
  updateUnit,
  searchUnit,
  filterByCourse,
  removeUnit,
  getAllUnit,
};
