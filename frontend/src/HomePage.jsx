import { useState } from "react";
import "./homepage.css";
import { Link } from "react-router-dom";

import Header from "./components/Header/Header";
import SearchBar from "./components/SearchBar/SearchBar";
import FilterButtons from "./components/FilterButtons/FilterButtons";
import BoardList from "./components/BoardList/BoardList";
import Footer from "./components/Footer/Footer";
import NewBoardForm from "./components/NewBoardForm/NewBoardForm";

export default function HomePage() {
  return (
    <div className="homepage-container">
      <Header />
      <SearchBar />
      <FilterButtons />
      <button>Create a New Board</button>
      <NewBoardForm />
      <BoardList />
      <Footer />
    </div>
  );
}
