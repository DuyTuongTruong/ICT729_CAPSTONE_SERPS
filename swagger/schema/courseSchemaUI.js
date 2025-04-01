const properties = {
  name: { type: "string", example: "Multiple media" },
  totalCredits: { type: "Number", example: 10 },
  headOfDepartment: { type: "string", example: "67b8508d3ffc0ca0981c7a66" },
};

const courseSchema = {
  type: "object",
  properties: {
    name: { type: "string", example: "Course" },
    headOfDepartment: { type: "string", example: "67b8508d3ffc0ca0981c7a66" },
    totalCredits: { type: "number", example: "10" },
  },
  required: ["name", "headOfDepartment", "totalCredits"],
};

const courseResponse = {
  200: {
    description: "get all course Successful",
    content: {
      "application/json": {
        schema: {
          type: "array",
          items: {
            type: "object",
            properties: {
              _id: { type: "string", example: "67b8508d3ffc0ca0981c7a66" },
              ...properties,
            },
          },
        },
      },
    },
  },
  201: {
    description: "Course created successfully",
    content: {
      "application/json": {
        schema: courseSchema,
      },
    },
  },
};

module.exports = { courseResponse, courseSchema };
