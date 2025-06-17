import React from "react";
import "./BoardCard.css";
import { Link } from "react-router-dom";

export default function BoardCard({ board }) {
  return (
    <article className="board-card">
      <img
        className="board-image"
        src="/placeholderboard.png"
        alt={`placeholder image`}
      />
      <h2>{board.title}</h2>
      <p>{board.category}</p>

      <div className="button-container">
        <Link to = {`/boards/${board.id}`}>
          <button>View Board</button>
        </Link>
        <button className = "deletebtn">Delete Board</button>
      </div>
    </article>
  );
}
