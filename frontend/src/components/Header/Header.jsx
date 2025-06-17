import React from "react";
import "./header.css";

export default function Header() {
  return (
    <header className="header-container">
      <img className="bonsai-img" src="/bonsai.png" alt="bonsai logo" />
      <h1>KudoBoard</h1>
    </header>
  );
}
