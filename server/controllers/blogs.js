import Blog from '../models/blogPost';

exports.getBlogs = async (req, res) => {
  const blogs = await Blog.find();
  res.send({ data: blogs });
};

exports.getSpecificBlog = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);
    res.send({ data: blog });
  } catch {
    res.status(404).send({ error: 'Blog not found' });
  }
};

exports.createBlog = async (req, res) => {
  const blog = new Blog(req.body);
  await blog.save();
  res.send({ data: blog });
};

exports.updateBlog = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);
    Object.assign(blog, req.body);
    blog.save();
    res.send({ data: blog });
  } catch (error) {
    res.status(404).send({ error: 'Blog not found' });
  }
};

exports.comments = async (req, res) => {
  try {
    await Blog.updateOne({ _id: req.params.id },
      { $push: { comments: { name: req.body.name, comment: req.body.comment } } });
    res.status(200).send({ message: 'Comment Added' });
  } catch (error) {
    res.status(404).send({ error: 'Blog not found' });
  }
};

exports.likes = async (req, res) => {
  try {
    await Blog.updateOne({ _id: req.params.id }, { $inc: { likes: 1 } });
    res.status(200).send({ message: 'Blog liked' });
  } catch (error) {
    res.status(404).send('Blog not found');
  }
};

exports.delete = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);
    await blog.remove();
    res.send('Post deleted successfully');
  } catch (error) {
    res.status(404).send({ error: 'Post Not found' });
  }
};
