import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Blog from './pages/Blog';
import Navbar from './components/Navbar';
import CreateBlog from './pages/CreateBlog';
import './App.css'

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/blog/:id" element={<Blog />} />
        <Route path="/create" element={<CreateBlog />} />
      </Routes>
    </>
  );
}

export default App;
