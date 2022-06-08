const express = require("express");
const booksRouter = require('./routers/books.router')

const app = express();

app.use(express.json())

app.use("/books", booksRouter);

app.get('/books/:id', (req, res) => {});

app.listen(4000, (err) => {
  if (err) {
    console.log(`Error starting server: ${err.message}`);
    throw err;
  }
  console.log("Sever listening on port 4000");
});
