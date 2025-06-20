import React from "react";
import "./BoardCard.css";
import { Link } from "react-router-dom";

export default function BoardCard({ board, handleDelete }) {
  return (
    <article className="board-card">
      <img
        className="board-image"
        src={`https://picsum.photos/350/350?random=${board.id}`}
        alt={`placeholder image`}
      />
      <h2>{board.title}</h2>
      <p>{board.category}</p>
      <p>{board.author ? board.author : "Anonymous"}</p>

      <div className="button-container">
        <Link to={`/board/${board.id}`}>
          <button>View Board</button>
        </Link>
        <button onClick={() => handleDelete(board.id)} className="deletebtn">
          Delete Board
        </button>
      </div>
    </article>
  );
}
