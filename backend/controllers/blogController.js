import Blog from '../models/Blog.js';

export const createBlog = async (req, res) => {
    try {
        const { title, content, author } = req.body;
        const blog = new Blog({ title, content, author });
        await blog.save();
        res.status(201).json({ message: 'Blog created successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error creating blog' });
    }
};

export const getBlogs = async (req, res) => {
    try {
        const blogs = await Blog.find().populate('author', 'username');
        res.json(blogs);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching blogs' });
    }
};
