const express = require("express");
const mongoose = require("mongoose");
const blogsRoute = require("./routes/blogs");

mongoose.connect("mongodb://localhost:27017/MyBlog", {useNewUrlParser: true, useUnifiedTopology: true}).then(()=>{
    const app = express();
    app.use(express.json());

    app.get("/blogs", blogsRoute.getBlogs); 
    app.post("/blogs", blogsRoute.createBlog);
    
    app.listen(7000, () =>{
        console.log("Server has started at port 7000");
    });  

}).catch(() =>{
    console.log("Database Connection failed");
})



