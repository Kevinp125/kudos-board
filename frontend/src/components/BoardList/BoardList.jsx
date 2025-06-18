import React from "react";
import "./boardlist.css";
import BoardCard from "./BoardCard/BoardCard";

export default function BoardList({boardList}) {
  return (
    <section className="boardlist-container">
      {boardList.map((board) => (
        <BoardCard key={board.id} board={board} />
      ))}
    </section>
  );
}
