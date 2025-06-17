import React from "react";
import "./BoardCard.css";

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
        <button>View Board</button>
        <button>Delete Board</button>
      </div>
    </article>
  );
}
