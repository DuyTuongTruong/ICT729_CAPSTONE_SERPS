const passport = require("passport");
const { roleLevels } = require("../constants/roles");

const protect = passport.authenticate("jwt", { session: false });

const authorization = (role) => (req, res, next) => {
  if (!req.user) {
    return res.status(401).json({ success: false, message: "Unauthorized" });
  }

  if (roleLevels[req.user.role] < roleLevels[role]) {
    return res
      .status(403)
      .json({ success: false, message: "Access denied! " + role + " only." });
  }

  next();
};

module.exports = {
  protect,
  authorization,
};
