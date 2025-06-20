import React from "react";
import { useState } from "react";
import "./post-card.css";
import { increaseUpvote } from "../../../../utils";
import { updatePinStatus } from "../../../../utils";

export default function PostCard({ post, board, handleDelete, togglePinRefetch, handleModalOpen}) {
  const [upvotes, setUpVotes] = useState(post.upvotes);
  const [isPinned, setIsPinned] = useState(post.isPinned);

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

  async function handlePinTogggle(cardId, boardId){
    setIsPinned(!isPinned)
    const updatedPinCard = await updatePinStatus(cardId, boardId);
    if(updatedPinCard){ //if card got updated and updated card object is returned we want to call parent togglePinRefetch function to get cards from database again since one now has the pin
      togglePinRefetch();
    }
    else{
      console.error("could not update pinned card");
    }
  }

  return (
    <article className="post-card">
      <p className = "pin-btn" onClick = {() => handlePinTogggle(post.cardId, board.boardId)}>{isPinned === true?'📌':'⬛️'}</p>
      <h2>{post.title}</h2>
      <p>{post.message}</p>
      <img className="post-image" src={post.gif} alt={`placeholder image`} />

      <p>{post.author}</p>
      <div className="post-btn-container">
        <button className="upvotebtn" onClick={handleUpVoteClick}>
          Upvote: {upvotes}
        </button>
        <button onClick = {() => handleDelete(post.cardId)}className="deletebtn">Delete</button>
      </div>
      
      <button onClick = {() => handleModalOpen(post)}>Comment Section</button>
    </article>
  );
}
