// import prisma client lib and instantiate
const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

module.exports = {
  async find(clientInput) {
    const boards = await prisma.board.findMany({ where: clientInput });
    return boards;
  },

  async findWithCards(id) {
    const board = await prisma.board.findUnique({
      where: { id: Number(id) },
      include: { 
        cards: {
          orderBy:[
            {isPinned: 'desc'},
            {pinnedTime: 'desc'},
            {createdAt: 'asc'},
          ]
        }
      },
    });
    return board;
  },

  async findById(id) {
    const specificBoard = await prisma.board.findUnique({ where: { id } });
    return specificBoard;
  },

  async create(newBoard) {
    const created = await prisma.board.create({
      data: {
        title: newBoard.title,
        category: newBoard.category,
        author: newBoard.author || null,
        image: newBoard.image || "/placeholderboard.png",
      },
    });
    return created;
  },

  async delete(id) {
    const deleted = await prisma.board.delete({ where: { id } });
    return deleted;
  },
};
