const express = require("express");

const userRoute = require("./user");
const courseRoute = require("./course");
const unitRoute = require("./unit");
const router = express.Router();

router.use("/", userRoute);
router.use("/", courseRoute);
router.use("/", unitRoute);

module.exports = router;
