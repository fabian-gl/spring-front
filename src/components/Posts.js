import React, { useState, useEffect } from "react";

import { getPosts } from "../utils/serverCalls";

const Posts = () => {
  const [posts, setPosts] = useState([]);

  const getAllPosts = async () => {
    const fetchedPosts = await getPosts();
    setPosts(fetchedPosts);
  };
  useEffect(() => {
    getAllPosts();
  }, []);

  return (
    <div>
      <h1>POSTS</h1>
    </div>
  );
};

export default Posts;
