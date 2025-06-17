import React from "react";
import './newboardform.css'

export default function NewBoardForm() {
  return (
    <div className="form-overlay">
      <form id="form-container">
        <div>
          <span className="close" id="form-close">
            &times;
          </span>
        </div>

        <h2>Add New Board</h2>

        <div className="form-group">
          <label for="boardName"> Board Name</label>
          <input type="text" name="BoardName" required />
        </div>

        <div className="form-group">
          <label for="category"> Category</label>
          <input type="text" name="Category" required />
        </div>

        <button type="submit">Submit!</button>
      </form>
    </div>
  );
}
