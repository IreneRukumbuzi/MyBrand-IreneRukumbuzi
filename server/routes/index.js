const express = require("express");
const router = express.Router();
const blogsController = require("../controllers/blogs");
const queriesController = require("../controllers/queries");
const validatorE = require("../validations/query_valid");



router.get("/blogs",  blogsController.getBlogs); 
router.post("/blogs",  blogsController.createBlog);
router.get("/queries",  queriesController.storeQueries);
router.post("/queries", validatorE.validator, queriesController.createQuery);
router.get("/users", (req, res) =>{
    res.json({
        message: "Hello"
    });
})

module.exports = router;