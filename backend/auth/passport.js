const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const { comparePasswords } = require("../auth/helpers");
const usersQueries = require("../database/queries/users");

passport.use(
  new LocalStrategy(async (username, password, done) => {
    try {
      const user = await usersQueries.getUserByUsername(username);
      if (!user) {
        return done(null, false);
      }

      const passMatch = await comparePasswords(password, user.password_digest);
      if (!passMatch) {
        return done(null, false);
      }

      delete user.password_digest;
      done(null, user);
    } catch (err) {
      done(err);
    }
  })
);

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser(async (user, done) => {
  try {
    let retrievedUser = await usersQueries.getUserByUsername(user.username);
    delete retrievedUser.password_digest;
    done(null, retrievedUser);
  } catch (err) {
    done(err, false);
  }
});

module.exports = passport;
