import React from "react";
import { useState } from "react";
import "./newcardform.css";

export default function NewCardForm({
  setNewCardFormOpened,
  handleNewCardSubmission,
  boardId,
}) {
  const [cardTitle, setCardTitle] = useState("");
  const [cardMessage, setCardMessage] = useState("");
  const [cardAuthor, setCardAuthor] = useState("");

  function handleClose() {
    setNewCardFormOpened(false);
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    //here construct object from stuff user typed and then send it up to parent
    const newCard = {
      title: cardTitle,
      message: cardMessage,
      author: cardAuthor ? cardAuthor : "Anonymous",
      boardId: boardId,
      upvotes: 0,
      gif: "testurlyayayaya",
    };
    handleNewCardSubmission(newCard);
  };

  const handleCardTitleChange = (event) => {
    setCardTitle(event.target.value);
  };

  const handleCardMessageChange = (event) => {
    setCardMessage(event.target.value);
  };

  const handleCardAuthorChange = (event) => {
    setCardAuthor(event.target.value);
  };

  return (
    <div className="form-overlay">
      <form onSubmit = {handleSubmit} id="form-container">
        <div>
          <span onClick={handleClose} className="close">
            &times;
          </span>
        </div>

        <h2>Add New Card</h2>

        <div className="form-group">
          <label for="cardTitle">Card Title</label>
          <input
            onChange={handleCardTitleChange}
            value={cardTitle}
            type="text"
            id="cardTitle"
            name="cardTitle"
            required
          />
        </div>

        <div className="form-group">
          <label for="messaage">Card Message</label>
          <input
            onChange={handleCardMessageChange}
            value={cardMessage}
            type="text"
            id="message"
            name="message"
            required
          />
        </div>

        <div className="form-group">
          <label for="Author">Author</label>
          <input
            onChange={handleCardAuthorChange}
            value={cardAuthor}
            type="text"
            id="Author"
            name="Author"
            placeholder="Optional"
          />
        </div>

        <button type="submit">Submit!</button>
      </form>
    </div>
  );
}
