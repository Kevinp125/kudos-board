import React from "react";
import "./boardcard.css";
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
      <p>{board.author}</p>

      <div className="button-container">
        <Link to={`/board/${board.id}`}>
          <button>View Board</button>
        </Link>
        <button className="deletebtn">Delete Board</button>
      </div>
    </article>
  );
}
