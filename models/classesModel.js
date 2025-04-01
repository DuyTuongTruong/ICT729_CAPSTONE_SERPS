const mongodb = require("mongoose");
const Schema = mongodb.Schema;

const ClassSchema = new Schema(
  {
    year: { type: Number, required: true },
    semester: { type: Number, required: true },
    unitId: { type: Schema.Types.ObjectId, ref: "Unit", required: true },
    className: { type: String, required: true, trim: true, unique: true },
    students: [{ type: Schema.Types.ObjectId, ref: "Users" }],
    quantity: { type: Number, required: true },
    lecture: {
      type: Schema.Types.ObjectId,
      ref: "Users",
      required: true,
    },
    attendance: [
      {
        date: { type: Date, required: true },
        topic: { type: String, required: true },
        students: [
          {
            student: { type: Schema.Types.ObjectId, ref: "Users" },
            status: {
              type: String,
              enum: ["present", "absent"],
              required: true,
            },
          },
        ],
      },
    ],
    schedule: [
      {
        day: { type: String, required: true },
        time: { type: String, required: true },
      },
    ],
  },
  { timestamps: true }
);

const Class = mongodb.model("Class", ClassSchema);
module.exports = Class;

