const mongodb = require("mongoose");
const Schema = mongodb.Schema;

const UnitSchema = new Schema(
  {
    year: { type: Number, required: true },
    semester: { type: Number, required: true },
    course: { type: Schema.Types.ObjectId, ref: "Course", required: true },
    name: { type: String, required: true, trim: true, unique: true },
    credits: { type: Number, required: true },
  },
  { timestamps: true }
);

const Unit = mongodb.model("Unit", UnitSchema);
module.exports = Unit;
