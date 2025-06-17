import React from "react";
import { useState } from "react";
import "./newboardform.css";

export default function NewBoardForm({ setNewBrdFormOpened }) {
  const [boardTitle, setBoardTitle] = useState("");
  const [boardCat, setBoardCat] = useState("");

  function handleClose() {
    setNewBrdFormOpened(false);
  }

  const handleTitleChange = (event) => {
    setBoardTitle(event.target.value);
  };

  const handleCatChange = (event) => {
    setBoardCat(event.target.value);
  };

  return (
    <div className="form-overlay">
      <form id="form-container">
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
            name="BoardName"
            required
          />
        </div>

        <div className="form-group">
          <label for="category">Board Category</label>
          <input
            onChange={handleCatChange}
            value={boardCat}
            type="text"
            name="Category"
            required
          />
        </div>

        <button type="submit">Submit!</button>
      </form>
    </div>
  );
}
