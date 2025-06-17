import { useState } from "react";
import "./HomePage.css";
import { Link } from "react-router-dom";

import Header from "./components/Header/Header";
import BoardList from "./components/BoardList/BoardList";
import Footer from "./components/Footer/Footer";

export default function HomePage() {
  return (
    <div className="homepage-container">
      <Header />
      <BoardList />
      <Footer />
    </div>
  );
}
