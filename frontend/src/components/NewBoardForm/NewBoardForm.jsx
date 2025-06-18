import React from "react";
import { useState } from "react";
import "./newboardform.css";

export default function NewBoardForm({ setNewBoardFormOpened, handleNewBoardSubmit }) {
  const [boardTitle, setBoardTitle] = useState("");
  const [boardCat, setBoardCat] = useState("");
  const [boardAuthor, setBoardAuthor] = useState("");

  function handleClose() {
    setNewBoardFormOpened(false);
  }
  
  const handleTitleChange = (event) => {
    setBoardTitle(event.target.value);
  };

  const handleCatChange = (event) => {
    setBoardCat(event.target.value);
  };

  const handleAuthorChange = (event) => {
    setBoardAuthor(event.target.value);
  };

  return (
    <div className="form-overlay">
      <form onSubmit = {(event) => handleNewBoardSubmit(event, boardTitle,boardCat,boardAuthor)} id="form-container">
        <div>
          <span onClick={handleClose} className="close">
            &times;
          </span>
        </div>

        <h2>Add New Board</h2>

        <div className="form-group">
          <label for="boardName">Board Title</label>
          <input
            onChange={handleTitleChange}
            value={boardTitle}
            type="text"
            id="BoardName"
            required
          />
        </div>

        <div className="form-group">
          <label for="category">Board Category</label>
          <input
            onChange={handleCatChange}
            value={boardCat}
            type="text"
            id="Category"
            required
          />
        </div>

        <div className="form-group">
          <label for="category">Author</label>
          <input
            onChange={handleAuthorChange}
            value={boardAuthor}
            type="text"
            id="Category"
            placeholder="Optional"
          />
        </div>

        <button type="submit">Submit!</button>
      </form>
    </div>
  );
}
