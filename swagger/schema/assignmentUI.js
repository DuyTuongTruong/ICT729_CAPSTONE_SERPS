const assignmentSchema = {
  type: "object",
  required: [
    "unitId",
    "title",
    "description",
    "startDay",
    "deadline",
    "maxMarks",
  ],
  properties: {
    unitId: {
      type: "string",
      example: "60d21b4967d0d8992e610c85",
    },
    title: {
      type: "string",
      example: "Data Structures Assignment 1",
    },
    description: {
      type: "string",
      example: "Complete the given problems on linked lists and trees.",
    },
    startDay: {
      type: "string",
      format: "date-time",
      example: "2024-03-10T00:00:00Z",
    },
    deadline: {
      type: "string",
      format: "date-time",
      example: "2024-03-20T23:59:59Z",
    },
    maxMarks: {
      type: "number",
      example: 100,
    },
    marks: {
      type: "number",
      example: 85,
    },
    submissions: {
      type: "array",
      items: {
        type: "object",
        required: ["classId", "students"],
        properties: {
          classId: {
            type: "string",
            example: "60d21b4967d0d8992e610c86",
          },
        },
      },
    },
  },
};
const assignmentGradeSchema = {
  type: "object",
  properties: {
    studentId: {
      type: "string",
      format: "uuid",
      example: "65fcd2a78b5a1d4b3c1e3f8d",
    },
    grade: {
      type: "number",
      example: 85,
    },
  },
};

const assignmentSubmissionSchema = {
  type: "object",
  required: ["classId", "studentId", "submissionDate", "file"],
  properties: {
    classId: {
      type: "string",
      format: "uuid",
      example: "60d21b4967d0d8992e610c81",
    },
    studentId: {
      type: "string",
      format: "uuid",
      example: "60d21b4967d0d8992e610c81",
    },
    submissionDate: {
      type: "string",
      format: "date-time",
      example: "2025-03-27T08:00:00Z",
    },
    file: {
      type: "string",
      format: "uri",
      example: "https://example.com/submissions/assignment1.pdf",
    },
    grade: {
      type: "number",
      example: 90,
      description: "Grade assigned by the teacher (optional)",
    },
  },
};

module.exports = {
  assignmentSchema,
  assignmentGradeSchema,
  assignmentSubmissionSchema,
};
