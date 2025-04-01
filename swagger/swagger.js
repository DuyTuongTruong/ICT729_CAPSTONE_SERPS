const swaggerJSDoc = require("swagger-jsdoc");
const { signinSchema, signinResponse } = require("./schema/userLoginSchemaUI");
const { UserSchema, userResponse } = require("./schema/userSchemaUI");
const { courseResponse, courseSchema } = require("./schema/courseSchemaUI");
const responseSchema = require("./schema/schemaResponse");
const { unitSchema, unitResponse } = require("./schema/unitSchemaUI");
const { classSchema } = require("./schema/classSchemaUI");
const {
  assignmentSchema,
  assignmentGradeSchema,
  assignmentSubmissionSchema,
} = require("./schema/assignmentUI");

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "API Documentation",
      version: "1.0.0",
      description: "A simple Express API documented with Swagger",
    },
    servers: [
      {
        url: process.env.BASE_URL || "http://localhost:3000/api/v1",
      },
    ],
    components: {
      schemas: {
        SigninRequest: signinSchema,
        UserSchema: UserSchema,
        CourseSchema: courseSchema,
        UnitSchema: unitSchema,
      },
      responses: {
        SigninSuccess: signinResponse[200],
        SuccessRequest: responseSchema[200],
        BadRequest: responseSchema[400],
        Unauthorized: responseSchema[401],
        UserSchemaResponse: userResponse[200],
        CourseSchemaResponse: courseResponse[200],
        CourseSchemaCreateResponse: courseResponse[201],
        GetAllUnits: unitResponse[200],
        UnitCreated: unitResponse[201],
      },
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },
    },
  },
  apis: ["./routes/*.js"],
};

const swaggerSpec = swaggerJSDoc(options);

module.exports = swaggerSpec;
