import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../App.css';

function CreateBlog() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');

    try {
      const response = await axios.post(
        'https://blog2-z877.vercel.app/api/blogs',
        { title, content },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );
      console.log('Blog created:', response.data);
      navigate('/'); 
    } catch (error) {
      console.error('Failed to create blog:', error);
      alert('Error creating blog. Please try again.');
    }
  };

  return (
    <div className="create-blog-container">
      <h2>Create New Blog</h2>
      <form onSubmit={handleSubmit} className="create-blog-form">
        <input
          type="text"
          placeholder="Enter blog title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <textarea
          placeholder="Write your content here..."
          rows="10"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          required
        ></textarea>
        <button type="submit">Publish</button>
      </form>
    </div>
  );
}

export default CreateBlog;
