import React, { useState, useEffect } from "react";
import axios from "axios";
import BlogCard from "../components/BlogCard";
import { useNavigate } from "react-router-dom";

const UserBlogs = () => {
  const [blogs, setBlogs] = useState([]);
  const navigate = useNavigate();

  // Fetch blogs created by the logged-in user
  const getUserBlogs = async () => {
    try {
      const id = localStorage.getItem("userId");

      if (!id) {
        console.warn("User ID not found in localStorage");
        navigate("/login");
        return;
      }

      const { data } = await axios.get(`/api/v1/blog/user-blog/${id}`);
      if (data?.success) {
        setBlogs(data.userBlog.blogs || []);
      } else {
        setBlogs([]);
      }
    } catch (error) {
      console.error("Error fetching user blogs:", error);
      setBlogs([]);
    }
  };

  useEffect(() => {
    getUserBlogs();
  }, []);

  return (
    <div>
      {blogs.length > 0 ? (
        blogs.map((blog) => (
          <BlogCard
            key={blog._id}
            id={blog._id}
            isUser={true}
            title={blog.title}
            description={blog.description}
            image={blog.image}
            username={blog.user.username} // ✅ Now guaranteed to exist
            time={blog.createdAt}
          />
        ))
      ) : (
        <h1>You haven’t created any blogs yet.</h1>
      )}
    </div>
  );
};

export default UserBlogs;
