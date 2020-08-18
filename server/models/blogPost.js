import mongoose from 'mongoose';

const blogSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  imageUrl: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  comments: {
    type: Array,
  },
  likes: {
    type: Number,
    default: 0,
  },
});

export default mongoose.model('blogPost', blogSchema);
