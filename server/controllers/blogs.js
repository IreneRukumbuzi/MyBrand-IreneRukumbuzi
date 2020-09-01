import Blog from '../models/Blog';

exports.getBlogs = async (req, res) => {
  const blogs = await Blog.find();
  res.status(200).send({ data: blogs });
};

exports.getSpecificBlog = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);
    res.status(200).send({ data: blog });
  } catch {
    res.status(404).send({ error: 'Blog not found' });
  }
};

exports.createBlog = async (req, res) => {
  const blog = new Blog(req.body);
  await blog.save();
  res.status(201).send({ data: blog });
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

exports.getComments = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);
    res.status(200).send({ data: blog.comments });
  } catch (error) {
    res.status(400).send({ error: 'Blog not found' });
  }
};

exports.likes = async (req, res) => {
  try {
    await Blog.updateOne({ _id: req.params.id }, { $inc: { likes: 1 } });
    res.status(200).send({ message: 'Blog liked' });
  } catch (error) {
    res.status(404).send({ message: 'Blog not found' });
  }
};

exports.delete = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);
    await blog.remove();
    res.status(204).send({ message: 'Post deleted successfully' });
  } catch (error) {
    res.status(404).send({ error: 'Post Not found' });
  }
};
