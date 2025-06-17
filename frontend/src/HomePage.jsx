import { useState } from "react";
import { useRef } from "react";
import "./homepage.css";
import { boards } from "./data";
import { Link } from "react-router-dom";

import Header from "./components/Header/Header";
import SearchBar from "./components/SearchBar/SearchBar";
import FilterButtons from "./components/FilterButtons/FilterButtons";
import BoardList from "./components/BoardList/BoardList";
import Footer from "./components/Footer/Footer";
import NewBoardForm from "./components/NewBoardForm/NewBoardForm";

export default function HomePage() {
  const [newBrdFormOpened, setNewBrdFormOpened] = useState(false);
  const [boardList, setBoardList] = useState(boards);

  //this function will be passed down to FilterButtons component so that in that component we can determine which filter user clicks and call this function and send result back up to parent in the form of "filterType". All filtering logic and updating of boardList happens here so we dont have to pass all that down
  function handleFilter(filterType) {
    if (filterType === "all") {
      setBoardList(boards);
    } else if (filterType === "recent") {
      //sort the array by recent date and then splice it so only 6 get displayed
    } else if (filterType === "celebration") {
      const filteredList = boardList.filter(
        (board) => board.category === "celebration"
      );
      setBoardList(filteredList);
    } else if (filterType === "thank you") {
      const filteredList = boards.filter(
        (board) => board.category === "thank you"
      );
      console.log(filteredList);
      setBoardList(filteredList);
    } else {
      const filteredList = boards.filter(
        (board) => board.category === "inspiration"
      );
      setBoardList(filteredList);
    }
  }

  //
  //const filkterarr = filter(baor)

  return (
    <div className="homepage-container">
      <Header />
      <SearchBar />
      <FilterButtons handleFilter={handleFilter} />
      <button onClick={() => setNewBrdFormOpened(true)}>
        Create a New Board
      </button>
      {newBrdFormOpened && (
        <NewBoardForm setNewBrdFormOpened={setNewBrdFormOpened} />
      )}
      <BoardList boardList={boardList} />
      <Footer />
    </div>
  );
}
