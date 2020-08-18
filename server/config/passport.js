import passport from 'passport';
import User from '../models/User';

const LocalStrategy = require('passport-local').Strategy;

passport.use(
  new LocalStrategy({ usernameField: 'email' }, (email, password, done) => {
    User.findOne({ email })
      .then((user) => {
        if (!user) {
          return done(null, false, { message: 'Email is not registered' });
        } if (user.password === password) done(null, user);
        else {
          done(null, false, { message: 'Incorrect password.' });
        }
      })
      .catch((err) => console.log(err));
  }),
);

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((id, done) => {
  User.findOne(id, (err, user) => {
    done(err, user);
  });
});

module.exports = passport;
