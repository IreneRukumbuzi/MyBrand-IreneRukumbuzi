const passport = require("passport")
const LocalStrategy = require("passport-local").Strategy;
const mongoose = require("mongoose");
const User = require("../models/User");

passport.use(
        new LocalStrategy({ usernameField: "email"}, (email, password, done) =>{
            User.findOne({email:email})
            .then(user =>{
                if(!user){
                    return done(null, false, {message: "Email is not registered"})
                }
                else {
                    if (user.password === password) done(null, user);
                    else {
                      done(null, false, { message: "Incorrect password." });
                    }
                  }
            })
            .catch(err => console.log(err));
        })
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