const User = require("../models/userModel");

const { JWT_SECRET } = require("../configs");
const JWT = require("jsonwebtoken");

const encodedToken = (user) => {
  const payload = {
    userId: user._id,
    email: user.email,
    sub: user._id,
    iat: new Date().getTime(),
    exp: new Date().setDate(new Date().getDate() + 1),
  };
  return JWT.sign(payload, JWT_SECRET);
};

const index = async (req, res, next) => {
  const users = await User.find({});

  return res.status(200).json({ users });
};

const signIn = async (req, res, next) => {
  const token = encodedToken(req.user);

  res.setHeader("Authorization", token);

  return res.status(200).json({ success: true, token: token });
};

const createUser = async (req, res, next) => {
  try {
    let oldUser = await User.find({
      user_id: req.body.user_id,
      username: req.body.username,
      email: req.body.email,
      phone: req.body.phone,
    });
    if (oldUser.length > 0) {
      return res
        .status(400)
        .json({ success: false, message: "User is existed!" });
    }

    let newUser = new User(req.body);

    await newUser.save();

    return res.status(201).json({ success: true, user: newUser });
  } catch (error) {
    return res.status(400).json({ success: false, message: error.message });
  }
};

const createManyUser = async (req, res, next) => {
  try {
    let newUser = await User.insertMany(req.body);
    return res.status(201).json({ success: true, user: newUser });
  } catch (error) {
    return res.status(400).json({ success: false, message: error.message });
  }
};

const findOneUser = async (req, res, next) => {
  const { userID } = req.params;

  try {
    let user = await User.findById(userID);

    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User is not found!" });
    }

    return res.status(200).json({ success: true, user });
  } catch (error) {
    return res.status(400).json({ success: false, message: error.message });
  }
};

const updateUser = async (req, res, next) => {
  try {
    const { userID } = req.params;

    const { _id, ...updateData } = req.body;

    const updatedUser = await User.findByIdAndUpdate(userID, updateData, {
      new: true,
    });

    if (!updatedUser) {
      return res
        .status(404)
        .json({ success: false, message: "User not found!" });
    }

    return res.status(200).json({
      success: true,
      message: "User updated successfully!",
      user: updatedUser,
    });
  } catch (error) {
    return res.status(400).json({ success: false, message: error.message });
  }
};

const findAllTeachers = async (req, res, next) => {
  try {
    let teachers = await User.find({ role: "teacher" });

    return res.status(200).json({ success: true, teachers });
  } catch (error) {
    return res.status(400).json({ success: false, message: error.message });
  }
};

const secret = async (req, res, next) => {
  return res.status(200).json({ resources: true });
};

module.exports = {
  index,
  signIn,
  secret,
  createUser,
  findOneUser,
  updateUser,
  findAllTeachers,
  createManyUser,
};
