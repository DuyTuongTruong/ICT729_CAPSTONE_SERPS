const express = require("express");

const userRoute = require("./user");
const courseRoute = require("./course");
const unitRoute = require("./unit");
const classRoute = require("./class");
const router = express.Router();

router.use("/", userRoute);
router.use("/", courseRoute);
router.use("/", classRoute);
router.use("/", unitRoute);

module.exports = router;
