import { useState } from "react";
import { useEffect } from "react";
import "./homepage.css";
import { boards } from "./data";
import { getBoards } from "../utils";
import { createBoard } from "../utils";
import { deleteBoard } from "../utils";

import Header from "./components/Header/Header";
import SearchBar from "./components/SearchBar/SearchBar";
import FilterButtons from "./components/FilterButtons/FilterButtons";
import BoardList from "./components/BoardList/BoardList";
import Footer from "./components/Footer/Footer";
import NewBoardForm from "./components/NewBoardForm/NewBoardForm";

export default function HomePage() {
  const [newBoardFormOpened, setNewBoardFormOpened] = useState(false);
  const [boardList, setBoardList] = useState([]);
  const [boardListCopy, setBoardListCopy] = useState([]); //need this extra copy so that when we filter we dont alter and lose original board list

  function handleSearch(searchInput) {}

  function handleClear() {}

  //function gets called in NewBoardForm component whenever user clicks submit. It recieves all the new board detaisl as parameters and passes them to createBoard which is the api fetch request
  async function handleNewBoardSubmit(
    event,
    boardTitle,
    boardCat,
    boardAuthor
  ) {
    event.preventDefault(); //prevent default form behavior which makes it go away as soon as its submitted
    const newBoard = await createBoard(boardTitle, boardCat, boardAuthor);
    setBoardList((prevBoardList) => [...prevBoardList, newBoard]);
  }

  //function gets passed all the way down to BoardCard so that it can be invoked when delete button is clicked.
  async function handleDelete(deleteId){
    const deletedBoard = await deleteBoard(deleteId);
    const updatedList = boardList.filter(board => board.id !== deletedBoard.id)
    setBoardList(updatedList);
    
  }

  //this function will be passed down to FilterButtons component so that in that component we can determine which filter user clicks and call this function and send result back up to parent in the form of "filterType". All filtering logic and updating of boardList happens here so we dont have to pass all that down
  function handleFilter(filterType) {
    switch (filterType) {
      case "all":
        setBoardList(boardListCopy);
        break;
      case "recent":
        // TODO sort the array by recent date and then splice it so only 6 get displayed
        break;
      case "celebration":
      case "thank you":
      case "inspiration":
        const filteredList = boardListCopy.filter(
          (board) => board.category === filterType
        );
        setBoardList(filteredList);
        break;
      default:
      // maybe log this or treat as the "all"
    }
  }

  useEffect(() => {
    async function fetchBoards(){
      const boards = await getBoards();
      setBoardList(boards);
      setBoardListCopy(boards);
    }
    
    fetchBoards();
  }, []);

  return (
    <div className="homepage-container">
      <Header />
      <SearchBar handleSearch={handleSearch} handleClear={handleClear} />
      <FilterButtons handleFilter={handleFilter} />
      <button onClick={() => setNewBoardFormOpened(true)}>
        Create a New Board
      </button>
      {newBoardFormOpened && (
        <NewBoardForm
          handleNewBoardSubmit={handleNewBoardSubmit}
          setNewBoardFormOpened={setNewBoardFormOpened}
        />
      )}
      <BoardList boardList={boardList} handleDelete = {handleDelete}/>
      <Footer />
    </div>
  );
}
