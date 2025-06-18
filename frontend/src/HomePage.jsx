import { useState } from "react";
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
  const [newBoardFormOpened, setNewBoardFormOpened] = useState(false);
  const [boardList, setBoardList] = useState(boards);

  function handleSearch(searchInput) {}

  function handleClear() {}

  //this function will be passed down to FilterButtons component so that in that component we can determine which filter user clicks and call this function and send result back up to parent in the form of "filterType". All filtering logic and updating of boardList happens here so we dont have to pass all that down
  function handleFilter(filterType) {
    switch(filterType) {
      case "all":
        setBoardList(boards);
        break;
      case "recent":
        // TODO sort the array by recent date and then splice it so only 6 get displayed
        break;
      case "celebration":
      case "thank you":
      case "inspiration":
        const filteredList = boards.filter(
          (board) => board.category === filterType
        );
        setBoardList(filteredList);
        break;
      default:
        // maybe log this or treat as the "all"
    }
  }

  return (
    <div className="homepage-container">
      <Header />
      <SearchBar handleSearch={handleSearch} handleClear={handleClear} />
      <FilterButtons handleFilter={handleFilter} />
      <button onClick={() => setNewBoardFormOpened(true)}>
        Create a New Board
      </button>
      {newBoardFormOpened && (
        <NewBoardForm setNewBoardFormOpened={setNewBoardFormOpened} />
      )}
      <BoardList boardList={boardList} />
      <Footer />
    </div>
  );
}
