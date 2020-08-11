const express = require("express");
const mongoose = require("mongoose");
const blogsController = require("./controllers/blogs");
const queriesController = require("./controllers/queries");
const validatorE = require("./validations/query_valid");

mongoose.connect("mongodb://localhost:27017/MyBlog", {useNewUrlParser: true, useUnifiedTopology: true}).then(()=>{
    const app = express();
    app.use(express.json());

    app.get("/blogs",  blogsController.getBlogs); 
    app.post("/blogs",  blogsController.createBlog);
    app.get("/queries",  queriesController.storeQueries);
    app.post("/queries", validatorE.validator, queriesController.createQuery);

    app.listen(7000, () =>{
        console.log("Server has started at port 7000");
    });  

}).catch(() =>{
    console.log("Database Connection failed");
})



