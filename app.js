// Config env
require("dotenv").config();

const bodyParser = require("body-parser");
const cors = require("cors");
const express = require("express");
const logger = require("morgan");
const mongoClient = require("mongoose");

const checkHeaders = require("./middlewares/checkHeaders");

const passport = require("./middlewares/passport");

const swaggerUi = require("swagger-ui-express");
const swaggerSpec = require("./swagger/swagger");

const apiRouters = require("./routes");

mongoClient
  .connect(process.env.MONGO_URI, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("✅ Connected to MongoDB."))
  .catch((error) => console.error(`❌ Failed to connect to MongoDB: ${error}`));

const app = express();

// Middlewares
const allowedOrigins = process.env.BASE_URL || "http://localhost:3000/api/v1";

app.use(
  cors({
    origin: allowedOrigins,
    methods: "GET,POST,PUT,DELETE",
    credentials: true,
  })
);
app.use(logger("dev"));
app.use(bodyParser.json());
app.use(passport.initialize());
app.use(checkHeaders);

// Routes
app.use("/api/v1", apiRouters);

const CSS_URL =
  "https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/4.1.0/swagger-ui.min.css";

app.use(
  "/api/v1/api-docs",
  swaggerUi.serve,
  swaggerUi.setup(swaggerSpec, {
    customCss:
      ".swagger-ui .opblock .opblock-summary-path-description-wrapper { align-items: center; display: flex; flex-wrap: wrap; gap: 0 10px; padding: 0 10px; width: 100%; }",
    customCssUrl: CSS_URL,
    swaggerOptions: {
      persistAuthorization: true,
    },
  })
);

// Routes
app.get("/", (req, res, next) => {
  return res.status(200).json({
    message: "Server is OK!",
  });
});

// Catch 404 Errors and forward them to error handler
app.use((req, res, next) => {
  const err = new Error("Not Found");
  err.status = 404;
  next(err);
});

// Error handler function
app.use((err, req, res, next) => {
  const error = app.get("env") === "development" ? err : {};
  const status = err.status || 500;

  // response to client
  return res.status(status).json({
    error: {
      message: error.message,
    },
  });
});

// Start the server
const port = app.get("port") || 3000;
app.listen(port, () => console.log(`Server is listening on port ${port}`));

module.exports = app;
