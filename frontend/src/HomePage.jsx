import { useState } from "react";
import { useRef } from "react";
import "./homepage.css";
import { Link } from "react-router-dom";

import Header from "./components/Header/Header";
import SearchBar from "./components/SearchBar/SearchBar";
import FilterButtons from "./components/FilterButtons/FilterButtons";
import BoardList from "./components/BoardList/BoardList";
import Footer from "./components/Footer/Footer";
import NewBoardForm from "./components/NewBoardForm/NewBoardForm";

export default function HomePage() {

  const [newBrdFormOpened, setNewBrdFormOpened] = useState(false);
  
  return (
    <div className="homepage-container">
      <Header />
      <SearchBar />
      <FilterButtons />
      <button onClick = {() => setNewBrdFormOpened(true)}>Create a New Board</button>
      {newBrdFormOpened && <NewBoardForm setNewBrdFormOpened = {setNewBrdFormOpened}/>}
      <BoardList />
      <Footer />
    </div>
  );
}
