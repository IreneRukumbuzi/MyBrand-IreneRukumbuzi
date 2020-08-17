const mongoose = require("mongoose");

const blogSchema = new mongoose.Schema({
    title: { type: String,
        required: true
    },
    content: {type: String,
        required: true},
    imageUrl: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default:Date.now
    }
}); 

module.exports = mongoose.model("blogPost", blogSchema);