const express = require("express");
const router = express.Router();
const passport = require("passport");
const User = require("../models/User")
const validatorUser = require("../validations/user_valid");


router.post(
    "/login", validatorUser.validator,passport.authenticate("local"),(req,res) =>{
      
      req.login(req.body, (error) =>{
          if(error) res.send("Wrong Password");
          else {
            res.send({
              message: "logged in successfully",
              user: req.user})
          }
        });
    })

router.get('/logout', (req,res) => {
      req.logout();
      res.send('logged out successfully')
})
  router.get("/dashboard",(req,res,next)=>{
      if(req.isAuthenticated()) return next();
      else res.send('Unauthorized access.')
  }, (req, res) => {
    res.send("Inside dashboard");
  });
  

module.exports = router;