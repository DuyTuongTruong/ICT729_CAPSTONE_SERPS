const unitProperties = {
  _id: { type: "string", example: "65a12f8c1b2a3c4d" },
  year: { type: "number", example: 2024 },
  semester: { type: "number", example: 1 },
  course: { type: "string", example: "65a12f8c1b2a3c4e" },
  name: { type: "string", example: "Mathematics" },
  credits: { type: "number", example: 3 },
};

const unitSchema = {
  type: "object",
  properties: unitProperties,
  required: ["year", "semester", "course", "name", "credits"],
};

const unitResponse = {
  200: {
    description: "Successfully retrieved all units",
    content: {
      "application/json": {
        schema: {
          type: "array",
          items: {
            $ref: "#/components/schemas/UnitSchema",
          },
        },
      },
    },
  },
  201: {
    description: "Unit successfully created",
    content: {
      "application/json": {
        schema: unitSchema,
      },
    },
  },
};

module.exports = { unitSchema, unitResponse };
