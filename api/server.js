const express = require("express"); //importing express library
const cors = require("cors"); //allows for cross origin sharing. Since frontend is hosted on a port that isnt 3000 we need this enabled to express is able to send info back

const server = express(); //creating an instance of the express application
server.use(cors()); //allows app to use cross origin sharing
server.use(express.json()); //tells Express to automatically parse incoming requests with Content-Type: application/json and put the parsed data on req.body

const boardPrisma = require("./board-prisma-calls.js");
const cardPrisma = require("./card-prisma-calls.js");

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
