const passport = require("passport");
const JwtStrategy = require("passport-jwt").Strategy;
const LocalStrategy = require("passport-local").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;
const { JWT_SECRET, auth } = require("../configs");

const User = require("../models/userModel");

var opts = {};

opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = JWT_SECRET;
// Passport Jwt
passport.use(
  new JwtStrategy(opts, async (jwt_payload, done) => {
    try {
      const user = await User.findById(jwt_payload.sub);
      if (!user)
        return done(null, false, { success: false, message: "Unauthorized" });

      done(null, user);
    } catch (error) {
      done(error, false);
    }
  })
);

// Passport local
passport.use(
  new LocalStrategy(
    {
      usernameField: "email",
    },
    async (email, password, done) => {
      try {
        const user = await User.findOne({ email });
        if (!user) {
          return done(null, false, { msg: "Email not found" });
        }
        const isCorrectPassword = await user.isValidPassword(password);

        if (!isCorrectPassword)
          return done(null, false, { msg: "Incorrect password" });

        done(null, user);
      } catch (error) {
        done(error, false, { msg: "Email or password Incorrect password" });
      }
    }
  )
);

module.exports = passport;
