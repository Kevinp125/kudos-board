import { use } from "react";
import { useParams } from "react-router-dom"; //going to use this to get whatever params got passed into route (board id so we can render right info)
import { cards, boards } from "./data";
import './boarddetailpage.css';
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";

export default function BoardDetailPage(){

  const {id} = (useParams()); //get the id of the board we just clicked on whos posts we want to view. This id is accesible through the route since it is dynamic and each has their own link
  const parsedId = parseInt(id); //parse the id since it is returned as a string. We need to do this for comparison below

  const board = boards.find((board) => board.id === parsedId); //getting board object for this page depending on id we got from params
  const boardPosts = cards.filter((card) => card.boardId === parsedId); //filter through all our different posts but only return the ones that have the same boardId as the page we are on. Only want posts relevant to Board we clicked to view

  return(
    <div className="board-detail-page-container">
      <Header/>
      <h2>{board.title}</h2>
      <button>Create a Card</button>
      <Footer/>


    </div>
  )

}

