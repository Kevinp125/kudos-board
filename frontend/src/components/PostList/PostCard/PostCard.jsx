import React from "react";
import "./post-card.css";

export default function PostCard({ post }) {
  return (
    <article className="post-card">
      <h2>{post.title}</h2>
      <p>{post.message}</p>
      <img
        className="post-image"
        src="/placeholderboard.png"
        alt={`placeholder image`}
      />

      <div className="post-btn-container">
        <button>Upvote</button>
        <button className="deletebtn">Delete</button>
      </div>
    </article>
  );
}
