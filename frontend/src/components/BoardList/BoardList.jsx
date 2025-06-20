import React from "react";
import "./boardlist.css";
import BoardCard from "./BoardCard/BoardCard";

export default function BoardList({boardList, handleDelete}) {
  return (
    <section className="boardlist-container">
      {boardList.map((board) => (
        <BoardCard key={board.id} board={board} handleDelete = {handleDelete} />
      ))}
    </section>
  );
}
