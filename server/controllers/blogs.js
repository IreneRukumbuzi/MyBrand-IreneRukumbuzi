const Blog = require("../models/blogPost");

exports.getBlogs = async (req,res) =>{
    const blogs = await Blog.find();
    res.send({data: blogs});
};

exports.createBlog = async (req, res) =>{
    const blog = new Blog(req.body);
    await blog.save();
    res.send({data: blog});
};