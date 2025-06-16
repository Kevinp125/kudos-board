const express = require('express') //importing express library

const app = express() //creating an instance of hte express application

const PORT = 3000;

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`)
})