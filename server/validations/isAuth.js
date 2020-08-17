const passport = require("passport");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

exports.userAuthent =  async(req, res, next) => {
    if (req.isAuthenticated()) {
      return next();
    } else {
      res.send("Unauthorized access.");
    }
};

exports.pass = (req,res) =>{
    req.login(req.body, (error) =>{
        const admin = User.findOne({ email: req.body.email });
        const token = jwt.sign({admin:User}, "secret");
        if(error) res.send("Wrong Password");
        else {
          res.status(200).send({
            status: 200,    
            token: token
          })
        }
  });
}