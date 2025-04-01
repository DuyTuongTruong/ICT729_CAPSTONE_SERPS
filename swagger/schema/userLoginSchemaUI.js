const signinSchema = {
  type: "object",
  properties: {
    email: { type: "string", example: "emma.roberts@example.com" },
    password: { type: "string", example: "adminsecure" },
  },
  required: ["email", "password"],
};

const signinResponse = {
  200: {
    description: "Successful login",
    content: {
      "application/json": {
        schema: {
          type: "object",
          properties: {
            success: { type: "boolean", example: true },
            token: {
              type: "string",
              example:
                "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2N2I4NTA4ZDNmZmMwY2EwOTgxYzdhNmYiLCJlbWFpbCI6Implc3NpY2F3aGl0ZUBlZHUuY29tIiwic3ViIjoiNjdiODUwOGQzZmZjMGNhMDk4MWM3YTZmIiwiaWF0IjoxNzQwMzkxMTIwMzE3LCJleHAiOjE3NDA0Nzc1MjAzMTd9.VDSj2aWgurdGb2lBDjZ6i8_-WnT-G6UGYJES40DkPZQ",
            },
          },
        },
      },
    },
  },
  400: {
    description: "Invalid request",
    content: {
      "application/json": {
        schema: {
          type: "object",
          properties: {
            message: { type: "string" },
          },
        },
        example: {
          message: "Invalid request data",
        },
      },
    },
  },
  401: {
    description: "Wrong account or password",
    content: {
      "application/json": {
        schema: {
          type: "object",
          properties: {
            message: { type: "string" },
          },
        },
        example: {
          message: "Wrong account or password",
        },
      },
    },
  },
};

module.exports = { signinSchema, signinResponse };
