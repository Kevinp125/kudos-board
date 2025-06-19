import React from "react";
import { useState } from "react";
import "./post-card.css";
import { increaseUpvote } from "../../../../utils";

export default function PostCard({ post, board }) {
  const [upvotes, setUpVotes] = useState(post.upvotes);

  async function handleUpVoteClick() {
    setUpVotes((prevUpVotes) => prevUpVotes + 1); //optimistically increase upvote on user end so they feel site is fast

    try {
      const result = await increaseUpvote(post.cardId, board.id); //make the request to increaseUpvote on the actual database
      if (!result.ok) {
        //if result returned isnt ok
        throw new Error("Upvote failed!");
      }
    } catch (err) {
      //roll back update and remove the upvote
      setUpVotes((prevUpVotes) => prevUpVotes - 1);
    }
  }

  return (
    <article className="post-card">
      <h2>{post.title}</h2>
      <p>{post.message}</p>
      <img className="post-image" src={post.gif} alt={`placeholder image`} />

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
