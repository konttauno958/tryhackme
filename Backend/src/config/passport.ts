const { Strategy, ExtractJwt } = require("passport-jwt")
const passport = require("passport")
const User = require("../model/user.model");

const options = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: 'your_jwt_secret',
};

passport.use(new Strategy(options, (jwt_payload, done) => {
  User.findById(jwt_payload.id).then((user) => {
    if (user) {
      return done(null, user);
    } else {
      return done(null, false);
    }
  }).catch((err) => {
    if (err) {
      return done(err, false);
    }
  });
}));
