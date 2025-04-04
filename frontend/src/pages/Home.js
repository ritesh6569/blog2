import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

function Home() {
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/api/blogs')
      .then(response => setBlogs(response.data))
      .catch(error => console.log(error));
  }, []);

  return (
    <div className="blog-list">
      <h2>Blog Posts</h2>
      {blogs.map(blog => (
        <div className="blog-item" key={blog._id}>
        <h3>{blog.title}</h3>
        <p>{blog.content.length > 100 ? blog.content.substring(0, 100) + '...' : blog.content}</p>
        <Link to={`/blog/${blog._id}`} className="read-more">Read More</Link>
      </div>
      ))}
    </div>
  );
}

export default Home;
