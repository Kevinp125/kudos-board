const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

const boards = [
  {
    title: "Welcome Board",
    category: "inspiration",
    author: "jackson",
    image: "https://via.placeholder.com/300x150?text=Welcome+Board",
  },
  {
    title: "Celebration Highlights",
    category: "celebration",
    author: "",
    image: "https://via.placeholder.com/300x150?text=Celebration",
  },
  {
    title: "Thank You Notes",
    category: "thank you",
    author: "thomas",
    image: "https://via.placeholder.com/300x150?text=Thank+You",
  },
  {
    title: "Motivational Quotes",
    category: "inspiration",
    author: "kevi ",
    image: "https://via.placeholder.com/300x150?text=Motivation",
  },
  {
    title: "Team Achievements",
    category: "celebration",
    author: "",
    image: "https://via.placeholder.com/300x150?text=Team+Achievements",
  },
  {
    title: "Appreciation Board",
    category: "thank you",
    author: "jim",
    image: "https://via.placeholder.com/300x150?text=Appreciation",
  },
  {
    title: "Inspiration Wall",
    category: "inspiration",
    author: "bob",
    image: "https://via.placeholder.com/300x150?text=Inspiration+Wall",
  },
  {
    title: "Milestone Moments",
    category: "celebration",
    author: "",
    image: "https://via.placeholder.com/300x150?text=Milestones",
  },
];

const cards = [
  {
    boardId: 1,
    title: "Great Start!",
    message: "Kudos for getting the project off the ground!",
    gif: "https://media.giphy.com/media/3oEjI6SIIHBdRxXI40/giphy.gif",
    upvotes: 5,
    author: "Alice",
  },
  {
    boardId: 1,
    title: "Keep it up!",
    message: "Loving the momentum here!",
    gif: "https://media.giphy.com/media/l0MYt5jPR6QX5pnqM/giphy.gif",
    upvotes: 3,
    author: "Bob",
  },
  {
    boardId: 1,
    title: "Fantastic Effort!",
    message: "Your dedication really shows!",
    gif: "https://media.giphy.com/media/xT9IgG50Fb7Mi0prBC/giphy.gif",
    upvotes: 4,
    author: "Clara",
  },
  {
    boardId: 2,
    title: "Congrats on Launch!",
    message: "Celebrating the successful new product launch.",
    gif: "https://media.giphy.com/media/26ufdipQqU2lhNA4g/giphy.gif",
    upvotes: 10,
    author: "Charlie",
  },
  {
    boardId: 2,
    title: "Way to go team!",
    message: "Teamwork made the dream work!",
    gif: "https://media.giphy.com/media/xT0xeJpnrWC4XWblEk/giphy.gif",
    upvotes: 8,
    author: "Dana",
  },
  {
    boardId: 2,
    title: "Victory Dance",
    message: "We did it! Time to celebrate!",
    gif: "https://media.giphy.com/media/111ebonMs90YLu/giphy.gif",
    upvotes: 9,
    author: "Ethan",
  },
  {
    boardId: 3,
    title: "Thanks a ton!",
    message: "Appreciate all your help on the support desk.",
    gif: "https://media.giphy.com/media/xUPGcguWZHRC2HyBRS/giphy.gif",
    upvotes: 7,
    author: "Eve",
  },
  {
    boardId: 3,
    title: "Much appreciated!",
    message: "Your hard work never goes unnoticed.",
    gif: "https://media.giphy.com/media/3o6ZtpxSZbQRRnwCKQ/giphy.gif",
    upvotes: 4,
    author: "",
  },
  {
    boardId: 3,
    title: "Super Supportive",
    message: "Thanks for always being there to help.",
    gif: "https://media.giphy.com/media/l41lFw057lAJQMwg0/giphy.gif",
    upvotes: 6,
    author: "Grace",
  },
  {
    boardId: 4,
    title: "Motivation Monday",
    message: "Starting the week with positive vibes!",
    gif: "https://media.giphy.com/media/3o6ZtaO9BZHcOjmErm/giphy.gif",
    upvotes: 5,
    author: "",
  },
  {
    boardId: 4,
    title: "Keep Pushing",
    message: "Never give up on your dreams.",
    gif: "https://media.giphy.com/media/5GoVLqeAOo6PK/giphy.gif",
    upvotes: 7,
    author: "Ivy",
  },
  {
    boardId: 5,
    title: "Teamwork Rocks",
    message: "Together we can achieve anything!",
    gif: "https://media.giphy.com/media/l0MYt5jPR6QX5pnqM/giphy.gif",
    upvotes: 9,
    author: "Jack",
  },
  {
    boardId: 5,
    title: "Awesome Job",
    message: "Your efforts make a big difference.",
    gif: "https://media.giphy.com/media/xUPGcl3ijl9dyxxZSw/giphy.gif",
    upvotes: 6,
    author: "",
  },
];

async function main() {
  // Seed boards
  for (const board of boards) {
    await prisma.board.create({ data: board });
  }

  // Seed cards
  for (const card of cards) {
    await prisma.card.create({ data: card });
  }

  console.log("Database seeded successfully!");
}

main()
  .then(() => prisma.$disconnect())
  .catch((e) => {
    console.error(e);
    prisma.$disconnect();
    process.exit(1);
  });
