const classSchema = {
  type: "object",
  required: ["year", "semester", "unitId", "className", "lecture"],
  properties: {
    id: {
      type: "string",
      example: "65fcd2a78b5a1d4b3c1e3f8d",
    },
    year: {
      type: "number",
      example: 2024,
    },
    semester: {
      type: "number",
      example: 1,
    },
    unitId: {
      type: "string",
      example: "60d21b4967d0d8992e610c85",
    },
    className: {
      type: "string",
      example: "CS101 - Data Structures",
    },
    students: {
      type: "array",
      items: {
        type: "string",
      },
      example: ["60d21b4967d0d8992e610c81", "60d21b4967d0d8992e610c82"],
    },
    lecture: {
      type: "string",
      example: "60d21b4967d0d8992e610c80",
    },
    attendance: {
      type: "array",
      items: {
        type: "object",
        properties: {
          date: {
            type: "string",
            format: "date",
            example: "2024-03-20",
          },
          topic: {
            type: "string",
            example: "Introduction to Data Structures",
          },
          students: {
            type: "array",
            items: {
              type: "object",
              properties: {
                student: {
                  type: "string",
                  example: "60d21b4967d0d8992e610c81",
                },
                status: {
                  type: "string",
                  enum: ["present", "absent"],
                  example: "present",
                },
              },
            },
          },
        },
      },
    },
    schedule: {
      type: "array",
      items: {
        type: "object",
        properties: {
          day: {
            type: "string",
            example: "Monday",
          },
          time: {
            type: "string",
            example: "08:00 - 10:00 AM",
          },
        },
      },
    },
  },
};

module.exports = { classSchema };
