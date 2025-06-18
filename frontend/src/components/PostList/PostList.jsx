import React from "react";
import "./postlist.css";

import PostCard from "./PostCard/PostCard";

export default function PostList({ posts }) {
  return (
    <section className="postlist-container">
      {posts.map((post) => (
        <PostCard key={post.id} post={post} />
      ))}
    </section>
  );
}
