const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const bcrypt = require("bcryptjs");

const UserSchema = new Schema(
  {
    user_id: { type: String, required: true, unique: true, trim: true },
    fullName: { type: String, required: true, trim: true },
    gender: { type: String, enum: ["male", "female", "other"], required: true },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    phone: { type: String, required: true, unique: true, trim: true },
    role: {
      type: String,
      enum: ["student", "teacher", "admin", "superadmin"],
      required: true,
    },
    status: {
      type: String,
      enum: ["active", "inactive", "banned"],
      default: "active",
    },
    dateOfBirth: { type: Date, required: true },
    username: { type: String, required: true, unique: true, trim: true },
    password: { type: String, required: true, minlength: 6 },
    address: { type: String, trim: true },
    permissions: [{ type: String }],
  },
  { timestamps: true }
);

UserSchema.pre("insertMany", async function (next, docs) {
  if (Array.isArray(docs) && docs.length) {
    const hashedUsers = docs.map(async (user) => {
      const salt = await bcrypt.genSalt(10);
      const passwordHashed = await bcrypt.hash(user.password, salt);
      user.password = passwordHashed;
      return user;
    });
    docs = await Promise.all(hashedUsers);
    next();
  } else {
    return next(new Error({ success: false, message: "Users array is empty" }));
  }
});

UserSchema.pre("save", async function (next) {
  try {
    if (this.authType !== "local") next();

    const salt = await bcrypt.genSalt(10);

    const passwordHashed = await bcrypt.hash(this.password, salt);

    this.password = passwordHashed;

    next();
  } catch (error) {
    next(error);
  }
});

UserSchema.methods.isValidPassword = async function (newPassword) {
  try {
    return await bcrypt.compare(newPassword, this.password);
  } catch (error) {
    throw new Error(error);
  }
};

const User = mongoose.model("Users", UserSchema);
module.exports = User;
