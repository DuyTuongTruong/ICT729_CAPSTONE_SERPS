const responseSchema = {
  200: {
    description: "Successful response",
    content: {
      "application/json": {
        schema: {
          type: "object",
          properties: {
            success: { type: "boolean", example: true },
            message: { type: "string", example: "Request was successful" },
            data: { type: "object" },
          },
        },
      },
    },
  },
  400: {
    description: "Bad request",
    content: {
      "application/json": {
        schema: {
          type: "object",
          properties: {
            success: { type: "boolean", example: false },
            message: { type: "string", example: "Invalid request data" },
          },
        },
      },
    },
  },
  401: {
    description: "Unauthorized",
    content: {
      "application/json": {
        schema: {
          type: "object",
          properties: {
            success: { type: "boolean", example: false },
            message: { type: "string", example: "Unauthorized access" },
          },
        },
      },
    },
  },
};

module.exports = responseSchema;
