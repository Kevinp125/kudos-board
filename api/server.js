const express = require("express"); //importing express library
const cors = require("cors"); //allows for cross origin sharing. Since frontend is hosted on a port that isnt 3000 we need this enabled to express is able to send info back

const server = express(); //creating an instance of the express application
server.use(cors()); //allows app to use cross origin sharing
server.use(express.json()); //tells Express to automatically parse incoming requests with Content-Type: application/json and put the parsed data on req.body

const boardPrisma = require("./board-prisma-calls.js");
const cardPrisma = require("./card-prisma-calls.js");

//BELOW APIS ARE ALL CRUD FOR BOARDS

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

    const isNewBoardValid =
      newBoard.title !== undefined && newBoard.category !== undefined;

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

server.get("/api/boards/:boardId/cards", async (req, res, next) => {
  const boardId = Number(req.params.boardId); //get the object thats in param and make it a Number
  console.log(boardId);

  try {
    const cards = await cardPrisma.find(boardId);
    if (cards.length) {
      res.json(cards);
    } else {
      next({ status: "404", message: "cards for this board were not found" });
    }
  } catch (err) {
    next(err);
  }
});

server.post("/api/boards/:boardId/cards", async (req, res, next) => {
  const newCard = req.body;

  try {
    const validCard =
      newCard.message !== undefined &&
      newCard.gif !== undefined &&
      newCard.title !== undefined &&
      newCard.upvotes !== undefined &&
      newCard.boardId !== undefined;

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
      res.json(updatedCard);
    } else {
      next({ status: "404", message: "card to update not found" });
    }
  } catch (err) {
    next(err);
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
  console.log(message);
  console.log(status);
  res.status(status).json({ message });
});

module.exports = server;
