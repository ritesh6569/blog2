import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

function Blog() {
  const { id } = useParams();
  const [blog, setBlog] = useState(null);

  useEffect(() => {
    axios.get(`http://localhost:5000/api/blogs/${id}`)
      .then(response => setBlog(response.data))
      .catch(error => console.log(error));
  }, [id]);

  if (!blog) return <p>Loading...</p>;

  return (
    <div>
      <h2>{blog.title}</h2>
      <p>{blog.content}</p>
    </div>
  );
}

export default Blog;
