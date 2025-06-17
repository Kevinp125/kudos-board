import React from "react";
import "./boardlist.css";
import BoardCard from "./BoardCard/BoardCard";

import { boards } from "../../data";

export default function BoardList() {
  return (
    <section className="boardlist-container">
      {boards.map((board) => (
        <BoardCard key={board.id} board={board} />
      ))}
    </section>
  );
}
