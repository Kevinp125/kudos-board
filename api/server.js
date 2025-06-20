const express = require("express"); //importing express library
const cors = require("cors"); //allows for cross origin sharing. Since frontend is hosted on a port that isnt 3000 we need this enabled to express is able to send info back

const server = express(); //creating an instance of the express application
server.use(cors()); //allows app to use cross origin sharing
server.use(express.json()); //tells Express to automatically parse incoming requests with Content-Type: application/json and put the parsed data on req.body

const boardPrisma = require("./board-prisma-calls.js");
const cardPrisma = require("./card-prisma-calls.js");

const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

//BELOW APIS ARE ALL CRUD FOR BOARDS

//this returns a board information including its cards
server.get("/api/boards/:id", async (req, res, next) => {
  const id = req.params.id;

  try {
    const board = await boardPrisma.findWithCards(id);
    if (board) {
      res.json(board);
    } else {
      next({
        status: 404,
        message: "No board found that matches criteria",
      });
    }
  } catch (err) {
    next(err);
  }
});

server.get("/api/boards", async (req, res, next) => {
  const search = req.query;
  try {
    // How we get the boards is inside the find function which uses prisma client
    const boards = await boardPrisma.find(search);
    if (boards.length) {
      res.json(boards);
    } else {
      next({
        status: 404,
        message: "No boards found match the search criteria",
      });
    }
  } catch (err) {
    next(err);
  }
});

server.post("/api/boards", async (req, res, next) => {
  const newBoard = req.body; //save whatever is in req body to newBoard

  try {
    //validate that this newBoard object has fields required to succesfully make new board

    const isNewBoardValid = checkIfBoardValid(newBoard);

    if (isNewBoardValid) {
      const createdBoard = await boardPrisma.create(newBoard);
      res.status(201).json(createdBoard);
    } else {
      next({ status: 422, message: "board title and category are required" });
    }
  } catch (err) {
    next(err);
  }
});

server.delete("/api/boards/:id", async (req, res, next) => {
  const id = Number(req.params.id); //get the id of the board that is being requested for deletion
  try {
    const boardToDelete = await boardPrisma.findById(id); //use find by id function to see if board requested to delete even exists
    if (boardToDelete) {
      const deletedBoard = await boardPrisma.delete(id);
      res.json(deletedBoard);
    } else {
      next({ status: 404, message: "board not found" });
    }
  } catch (err) {
    next(err);
  }
});

//BELOW APIS ARE CRUD FOR CARDS

server.post("/api/boards/:boardId/cards", async (req, res, next) => {
  const newCard = req.body;

  try {
    const validCard = checkIfCardValid(newCard);

    if (validCard) {
      const createdCard = await cardPrisma.createCard(newCard);
      res.status(201).json(createdCard);
    } else {
      next({
        status: 422,
        message:
          "Gif, message, and title required. Also remember to set default upvote and boardId values",
      });
    }
  } catch (err) {
    next(err);
  }
});

server.put("/api/boards/:boardId/cards/:cardId", async (req, res, next) => {
  const cardId = Number(req.params.cardId); //get the object thats in params and make it a number. What is passed in param is our card id

  try {
    const cardToUpdate = await cardPrisma.findCardById(cardId); //get card we want to update first doing this to check if it even exists

    if (cardToUpdate) {
      const updatedCard = await cardPrisma.updateUpVotes(cardId);
      res.json({ ok: true });
    } else {
      next({ status: "404", message: "card to update not found" });
    }
  } catch (err) {
    next(err);
  }
});

//making this a patch because we are only toggling pin state. This route gets called upon whenver we click pin on a card
server.patch("/api/boards/:boardId/cards/:cardId", async (req, res, next) => {
  const cardId = Number(req.params.cardId); //get the object thats in params and make it a number. What is passed in param is our card id

  try {
    const card = await prisma.card.findUnique({
      //first find the card we are going to toggle pin state for
      where: { cardId },
    });

    if (!card) return res.status(404).json({ error: "Card not found" });

    const pinnedStateAfterToggle = !card.isPinned; //since this route gets called after we click toggle pin save the opposite of current pinned state

    const updatedCard = await prisma.card.update({ //call the update card
      where: { cardId }, 
      data: {
        isPinned: pinnedStateAfterToggle, //give it the new pinned state
        pinnedTime: pinnedStateAfterToggle ? new Date() : null, //give it a pinned time if the pinState is true if it gets untoggled assign time to be null 
      },
    });

    res.status(200).json(updatedCard); //return updated card
  } catch (err) {
    console.error("Error toggling pin:", err);
  }
});

server.delete("/api/boards/:boardId/cards/:cardId", async (req, res, next) => {
  const cardId = Number(req.params.cardId); //get the object thats in params and make it a number. What is passed in param is our card id

  try {
    const cardToDelete = await cardPrisma.findCardById(cardId); //get card we want to delete first doing this to check if it even exists

    if (cardToDelete) {
      const deletedCard = await cardPrisma.deleteCard(cardId);
      res.json(deletedCard);
    } else {
      next({ status: "404", message: "card to update not found" });
    }
  } catch (err) {
    next(err);
  }
});

// [CATCH-ALL]
server.use("/*", (req, res, next) => {
  next({ status: 404, message: "Not found" });
});

// Error handling middleware
server.use((err, req, res, next) => {
  const { message, status = 500 } = err;
  console.error(message);
  console.error(status);
  res.status(status).json({ message });
});

function checkIfBoardValid(board) {
  return board.title !== undefined && board.category !== undefined;
}

function checkIfCardValid(card) {
  return (
    card.message !== undefined &&
    card.gif !== undefined &&
    card.title !== undefined &&
    card.upvotes !== undefined &&
    card.boardId !== undefined
  );
}

module.exports = server;
