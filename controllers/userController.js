const User = require("../models/userModel");

const { JWT_SECRET } = require("../configs");
const JWT = require("jsonwebtoken");
const Class = require("../models/classesModel");
const Course = require("../models/courseModel");

const encodedToken = (user) => {
  const payload = {
    userId: user._id,
    email: user.email,
    role: user.role,
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

  return res
    .status(200)
    .json({ success: true, token: token, role: req.user.role });
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

const registerMultipleUsers = async (req, res, next) => {
  try {
    const users = req.body;

    if (!Array.isArray(users) || users.length === 0) {
      return res
        .status(400)
        .json({ success: false, message: "No users provided" });
    }

    const usernames = users.map((u) => u.username);
    const emails = users.map((u) => u.email);

    const existingUsers = await User.find({
      $or: [{ username: { $in: usernames } }, { email: { $in: emails } }],
    });

    if (existingUsers.length > 0) {
      const conflicts = existingUsers.map((u) => ({
        username: u.username,
        email: u.email,
      }));

      return res.status(400).json({
        success: false,
        message: "Some users already exist",
        conflicts,
      });
    }

    const rolePrefixes = {
      student: "ST",
      teacher: "TC",
    };

    const counts = {};
    for (const role of Object.keys(rolePrefixes)) {
      const count = await User.countDocuments({ role });
      counts[role] = count;
    }

    const newUsers = users.map((user) => {
      const prefix = rolePrefixes[user.role];
      if (!prefix) {
        throw new Error(`Invalid role: ${user.role}`);
      }

      const nextNumber = ++counts[user.role];
      const user_id = `${prefix}${nextNumber.toString().padStart(3, "0")}`;

      return {
        ...user,
        user_id,
        permissions: [],
      };
    });

    const inserted = await User.insertMany(newUsers);

    return res.status(201).json({
      success: true,
      message: "All users registered successfully",
      users: inserted,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
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

const getClassesByStudent = async (req, res) => {
  try {
    const { studentId } = req.params;
    const { year, semester } = req.query;

    const filters = {
      students: studentId,
    };

    if (year) filters.year = year;
    if (semester) filters.semester = semester;

    const classes = await Class.find(filters)
      .populate("unitId")
      .populate("lecture", "fullName email")
      .exec();

    res.status(200).json({ success: true, data: classes });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const getCoursesByStudent = async (req, res) => {
  try {
    const { studentId } = req.params;

    const classes = await Class.find({ students: studentId }).populate(
      "unitId"
    );

    const unitIds = classes.map((cls) => cls.unitId);

    const courseIds = [
      ...new Set(unitIds.map((unit) => unit.course.toString())),
    ];

    const courses = await Course.find({ _id: { $in: courseIds } });

    res.status(200).json({ success: true, data: courses });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const getUnitsByStudent = async (req, res) => {
  try {
    const { studentId } = req.params;
    const { year, semester } = req.query;

    const classFilters = { students: studentId };
    if (year) classFilters.year = year;
    if (semester) classFilters.semester = semester;

    const classes = await Class.find(classFilters).populate("unitId");

    const unitMap = new Map();
    for (const cls of classes) {
      const unit = cls.unitId;
      if (unit && !unitMap.has(unit._id.toString())) {
        unitMap.set(unit._id.toString(), unit);
      }
    }

    res.status(200).json({ success: true, data: Array.from(unitMap.values()) });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
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
  registerMultipleUsers,
  getClassesByStudent,
  getCoursesByStudent,
  getUnitsByStudent,
};
