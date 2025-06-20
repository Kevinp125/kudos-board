const FETCH_URL = import.meta.env.VITE_FETCH_URL;

//function hits our get boards api and returns an array of board objects
export async function getBoards(query) {
  try {
    const res = await fetch(`${FETCH_URL}/api/boards?${query}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!res.ok) {
      throw new Error("fetching all boards failed");
    }

    const boardList = await res.json();
    return boardList;
  } catch (err) {
    console.error("Error fetching boards");
    console.error(err);
  }
}

//function hits our POST api which posts a board to the database table
export async function createBoard(boardTitle, boardAuthor, boardCat) {
  const newBoard = {
    title: boardTitle,
    category: boardCat,
    author: boardAuthor,
  };

  try {
    const res = await fetch(`${FETCH_URL}/api/boards`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newBoard),
    });

    if (!res.ok) {
      throw new Error("Failed to create a new board");
    }

    const newlyAddedBoard = await res.json();
    return newlyAddedBoard;
  } catch (err) {
    console.error("Error creating a new board");
    console.error(err);
  }
}

export async function deleteBoard(deleteId) {
  try {
    const res = await fetch(`${FETCH_URL}/api/boards/${deleteId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!res.ok) {
      throw new Error("Failed to delete board");
    }

    const deletedBoard = await res.json();
    return deletedBoard;
  } catch (err) {
    console.error("Error deleting board");
    console.error(err);
  }
}

//below fetch requests all pertain to the cards

export async function getBoardWithCards(boardId) {
  try {
    const res = await fetch(`${FETCH_URL}/api/boards/${boardId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!res.ok) {
      throw new Error("Failed to fetch board with cards");
    }
    const fetchedBoard = await res.json();
    return fetchedBoard;
  } catch (err) {
    console.error("Error fetching board");
    console.error(err);
  }
}

export async function increaseUpvote(cardId, boardId) {
  try {
    const res = await fetch(
      `${FETCH_URL}/api/boards/${boardId}/cards/${cardId}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (!res.ok) {
      throw new Error("Failed to update upvotes");
    }

    const upvoteStatus = await res.json();
    return upvoteStatus;
  } catch (err) {
    console.error("Couldnt update upvotes");
    console.error(err);
  }
}

export async function deleteCard(cardId, boardId) {
  try {
    const res = await fetch(`${FETCH_URL}/api/boards/${boardId}/cards/${cardId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!res.ok) {
      throw new Error("Failed to delete card");
    }

    const deletedCard = await res.json();
    return deletedCard;
  } catch (err) {
    console.error("Error deleting card");
    console.error(err);
  }
}

//function hits our POST api which posts a card to the database table
export async function createCard(newCard) {
  
  try {
    const res = await fetch(`${FETCH_URL}/api/boards/${newCard.boardId}/cards`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newCard),
    });

    if (!res.ok) {
      throw new Error("Failed to create a new card");
    }

    const newlyAddedCard = await res.json();
    return newlyAddedCard;
  } catch (err) {
    console.error("Error creating a new card");
    console.error(err);
  }
}

//function calls api route that updates pin state in database
export async function updatePinStatus(cardId, boardId){
  try {
    const res = await fetch(
      `${FETCH_URL}/api/boards/${boardId}/cards/${cardId}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (!res.ok) {
      throw new Error("Failed to update pinstatus ");
    }

    const updatedPinCard = await res.json();
    return updatedPinCard;
  } catch (err) {
    console.error("Couldnt update the pin state of card");
    console.error(err);
  }
}