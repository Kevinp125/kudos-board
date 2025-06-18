import React from "react";
import { useState } from "react";
import "./post-card.css";

export default function PostCard({ post }) {
  const [upvotes, setUpVotes] = useState(post.upvotes);

  function handleUpVoteClick() {
    setUpVotes((prevUpVotes) => prevUpVotes + 1);
  }

  return (
    <article className="post-card">
      <h2>{post.title}</h2>
      <p>{post.message}</p>
      <img
        className="post-image"
        src="/placeholderboard.png"
        alt={`placeholder image`}
      />

      <p>{post.author}</p>
      <div className="post-btn-container">
        <button className="upvotebtn" onClick={handleUpVoteClick}>
          Upvote: {upvotes}
        </button>
        <button className="deletebtn">Delete</button>
      </div>
    </article>
  );
}
