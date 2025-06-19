import { useParams } from "react-router-dom"; //going to use this to get whatever params got passed into route (board id so we can render right info)
import { useState } from "react";
import { useEffect } from "react";

import { getBoardWithCards } from "../utils";
import "./boarddetailpage.css";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import PostList from "./components/PostList/PostList";

export default function BoardDetailPage() {
  const { id } = useParams(); //get the id of the board we just clicked on whos posts we want to view. This id is accesible through the route since it is dynamic and each has their own link
  const [boardPosts, setBoardPosts] = useState([]);
  const [board, setBoard] = useState([])

  useEffect(() => {
    getBoardWithCards(id).then((fetchedBoard) =>{
      setBoard(fetchedBoard)
      setBoardPosts(fetchedBoard.cards)
    })

  },[])

  return (
    <div className="board-detail-page-container">
      <Header />
      <h2>{board.title}</h2>
      <button>Create a Card</button>
      <PostList board = {board} posts={boardPosts} />
      <Footer />
    </div>
  );
}
