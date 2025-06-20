import { useParams } from "react-router-dom"; //going to use this to get whatever params got passed into route (board id so we can render right info)
import { useState } from "react";
import { useEffect } from "react";

import { getBoardWithCards } from "../utils";
import { deleteCard } from "../utils";
import { createCard } from "../utils";
import { useTheme } from "./context/useTheme";
import "./boarddetailpage.css";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import PostList from "./components/PostList/PostList";
import NewCardForm from "./components/NewCardForm/NewCardForm";

export default function BoardDetailPage() {
  const { id } = useParams(); //get the id of the board we just clicked on whos posts we want to view. This id is accesible through the route since it is dynamic and each has their own link
  const [boardPosts, setBoardPosts] = useState([]);
  const [board, setBoard] = useState([]);
  const [newCardFormOpened, setNewCardFormOpened] = useState(false);

  async function handleDelete(cardId) {
    const deletedCard = await deleteCard(cardId, board.id);
    const updatedCards = boardPosts.filter(
      (post) => post.cardId !== deletedCard.cardId
    );
    setBoardPosts(updatedCards);
  }

  async function handleNewCardSubmission(newCard) {
    const newlyAddedCard = await createCard(newCard);
    setBoardPosts((prevBoardPosts) => [...prevBoardPosts, newlyAddedCard]);
  }

  //this function gets called whenever we pin a card to fetch the cards from the database in pinned order
  function togglePinRefetch(){


  }

  useEffect(() => {
    getBoardWithCards(id).then((fetchedBoard) => {
      setBoard(fetchedBoard);
      setBoardPosts(fetchedBoard.cards);
    });
  }, []);

  const {theme} = useTheme();

  return (
    <div className={`board-detail-page-container ${theme === 'dark' && 'dark-bg-boarddetail'}`}>
      <Header />
      <h2>{board.title}</h2>
      <button onClick={() => setNewCardFormOpened(true)}>Create a Card</button>
      <PostList board={board} posts={boardPosts} handleDelete={handleDelete} togglePinRefetch = {togglePinRefetch} />
      {newCardFormOpened && (
        <NewCardForm
          setNewCardFormOpened={setNewCardFormOpened}
          handleNewCardSubmission={handleNewCardSubmission}
          boardId={board.id}
        />
      )}
      <Footer />
    </div>
  );
}
