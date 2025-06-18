// import prisma client lib and instantiate
const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()

//in here goes all the functions that interact with cards table and do CRUD on it
module.exports = {
  async find(boardId){
    const cards = await prisma.card.findMany({where: {boardId}})
    return cards;
  },

  async createCard(newCard){
    const created = await prisma.card.create({data: newCard})
    return created;
  }






}