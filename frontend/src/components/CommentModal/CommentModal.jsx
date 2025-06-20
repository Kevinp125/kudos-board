import { useState } from "react";
import "./commentmodal.css";
import { addCommentToCard } from "../../../utils";

export default function CommentModal({ handleModalClose, card }) {
  const [commentInput, setCommentInput] = useState("");
  const [authorInput, setAuthorInput] = useState("");
  const [cardComments, setCardComments] = useState(card.comments); //set our array of comments to be whats in database card.comments

  //function gets called whenever user submits a comment
  async function handleCommentSubmit() {
    const comment = { message: commentInput, author: authorInput }; //construct a comment object so we can send it through fetch request
    const cardWithComment = await addCommentToCard(card.cardId, comment); //add commentTocard is the fetch request

    //if card was returned it means succesful update
    if (cardWithComment) {
      setCardComments(cardWithComment.comments); //set our card comments array's state to be the newly updated comments array
      setCommentInput(""); //clear inputs
      setAuthorInput("");
    } else {
      console.error("comment failed to add");
    }
  }

  return (
    <div id="modal" className="modal-overlay">
      <div className="modal-content">
        <div className="close-container">
          <span onClick={handleModalClose} className="close">
            &times;
          </span>
        </div>

        <h2>{card.title}</h2>
        <p>{card.message}</p>
        <img className="modal-img" src={card.gif} alt={`${card.title}'s gid`} />
        <p>{card.author}</p>

        <input
          onChange={(event) => setAuthorInput(event.target.value)}
          type="text"
          placeholder="Author (optional)"
          value={authorInput}
        />
        <input
          onChange={(event) => setCommentInput(event.target.value)}
          type="text"
          placeholder="Comment"
          value={commentInput}
          required
        />
        <button onClick={handleCommentSubmit}>Add Comment!</button>

        <div className="comments-container">
          {cardComments.map((comment) => {
            return <p>{comment}</p>;
          })}
        </div>
      </div>
    </div>
  );
}
