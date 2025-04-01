const properties = {
  user_id: { type: "string", example: "12345abcde" },
  fullName: { type: "string", example: "John Doe" },
  gender: {
    type: "string",
    enum: ["male", "female", "other"],
    example: "male",
  },
  email: { type: "string", format: "email", example: "johndoe@example.com" },
  phone: { type: "string", example: "+1234567890" },
  role: {
    type: "string",
    enum: ["student", "teacher", "admin", "superadmin"],
    example: "student",
  },
  status: {
    type: "string",
    enum: ["active", "inactive", "banned"],
    example: "active",
  },
  dateOfBirth: { type: "string", format: "date", example: "1995-08-15" },
  username: { type: "string", example: "johndoe95" },
  password: { type: "string", minLength: 6, example: "securepassword" },
  address: { type: "string", example: "123 Main St, New York, NY" },
  permissions: {
    type: Array,
    items: { type: "string" },
    example: ["read", "write", "delete"],
  },
};

const UserSchema = {
  type: "object",
  properties: properties,
  required: [
    "user_id",
    "fullName",
    "email",
    "role",
    "status",
    "dateOfBirth",
    "username",
    "password",
  ],
};

const userResponse = {
  200: {
    description: "get all users Successful",
    content: {
      "application/json": {
        schema: {
          type: "object",
          properties: {
            _id: { type: "string", example: "67b8508d3ffc0ca0981c7a66" },
            ...properties,
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

const createUser = {
  200: {
    description: "Successful login",
    content: {
      "application/json": {
        schema: {
          type: "object",
          properties: properties,
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

module.exports = { userResponse, createUser, UserSchema };
