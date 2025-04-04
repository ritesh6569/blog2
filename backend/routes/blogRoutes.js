// routes/blogRoutes.js
import express from 'express';
import Blog from '../models/Blog.js';
import verifyToken from '../middleware/verifyToken.js';

const router = express.Router();

router.post('/', verifyToken, async (req, res) => {
  const { title, content } = req.body;
  try {
    const blog = new Blog({ title, content, author: req.userId });
    const saved = await blog.save();
    res.status(201).json(saved);
  } catch (err) {
    res.status(500).json({ error: 'Blog creation failed' });
  }
});

router.get('/', async (req, res) => {
  try {
    const blogs = await Blog.find().sort({ createdAt: -1 });
    res.json(blogs);
  } catch (err) {
    res.status(500).json({ error: 'Error fetching blogs' });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);
    if (!blog) return res.status(404).json({ error: 'Blog not found' });
    res.json(blog);
  } catch (err) {
    res.status(500).json({ error: 'Error fetching blog' });
  }
});

export default router;
