const express = require("express");
const router = express.Router();
const passport = require("passport");
const validatorUser = require("../validations/user_valid");
const blogsController = require("../controllers/blogs");
const queriesController = require("../controllers/queries");
const queryValidator = require("../validations/query_valid");
const authValid = require("../validations/isAuth");
const blogsValidator = require("../validations/blog_valid");

router.get("/blogs",  blogsController.getBlogs);
router.get("/blogs/:id", blogsController.getSpecificBlog); 
router.delete("/blogs/:id", authValid.userAuthent, blogsController.delete);
router.patch("/blogs/:id", authValid.userAuthent, blogsController.updateBlog);
router.get("/queries", authValid.userAuthent, queriesController.storeQueries);
router.get("/queries/:id", authValid.userAuthent, queriesController.getOneQuery);
router.post("/queries", queryValidator.validator, queriesController.createQuery);
router.post("/blogs", authValid.userAuthent, blogsValidator.blogValidator, blogsController.createBlog); 
router.post("/login", validatorUser.validator, passport.authenticate("local"),authValid.pass);


router.get('/logout', (req,res) => {
      req.logout();
      res.send('logged out successfully')
})

module.exports = router;