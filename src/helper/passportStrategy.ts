import passport from 'passport';
import passportJWT from 'passport-jwt';
const ExtractJWT = require('passport-jwt').ExtractJwt;

const jwtStrategy = passportJWT.Strategy;

passport.use(
  new jwtStrategy(
    {
      secretOrKey: 'TOP_SECRET',
      jwtFromRequest: ExtractJWT.fromUrlQueryParameter('secret_token'),
    },
    function (token, done) {
      console.log(token, done);
      // User.findOne({ username: username }, function (err, user) {
      //   if (err) {
      //     return done(err);
      //   }
      //   if (!user) {
      //     return done(null, false, { message: "Incorrect username." });
      //   }
      //   if (!user.validPassword(password)) {
      //     return done(null, false, { message: "Incorrect password." });
      //   }
      //   return done(null, user);
      // });
      return done(null, { name: 'aaksh' });
    }
  )
);

export default passport;
