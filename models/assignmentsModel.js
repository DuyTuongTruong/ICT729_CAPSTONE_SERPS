const mongodb = require("mongoose");
const Schema = mongodb.Schema;

const AssignmentSchema = new Schema(
  {
    unitId: { type: Schema.Types.ObjectId, ref: "Unit", required: true },
    title: { type: String, required: true, trim: true },
    description: { type: String, required: true, trim: true },
    startDay: { type: Date, required: true },
    deadline: { type: Date, required: true },
    maxMarks: { type: Number, required: true },
    marks: { type: Number, required: false },
    submissions: [
      {
        classId: { type: Schema.Types.ObjectId, ref: "Class", required: true },
        students: [
          {
            studentId: {
              type: Schema.Types.ObjectId,
              ref: "Users",
              required: false,
            },
            submissionDate: { type: Date },
            file: { type: String },
            grade: { type: Number },
          },
        ],
      },
    ],
  },
  { timestamps: true }
);

const Assignment = mongodb.model("Assignment", AssignmentSchema);
module.exports = Assignment;
