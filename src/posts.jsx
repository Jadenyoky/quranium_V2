import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@mui/material";

const Posts = () => {
  const [posts, setPosts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("https://jsonplaceholder.typicode.com/posts")
      .then((response) => {
        setPosts(response.data);
      })
      .catch((error) => console.log(error));
  }, []);

  return (
    <div>
      <h1>Posts</h1>
      <ul>
        {posts.map((post) => (
          <li key={post.id}>
            <Link
              to={`/posts/${post.id}`}
              state={{ title: post.title, id: post.id }}
            >
              {post.title}
            </Link>
            <Button
              onClick={() => {
                navigate(`/posts/${post.id}`, {
                  state: {
                    title: post.title,
                    body: post.body,
                    id: post.id,
                    userId: post.userId,
                  },
                });
              }}
            >
              {post.title}
            </Button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Posts;
