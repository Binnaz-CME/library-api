const express = require("express");

const db = require("./config/db");
const app = express();

app.get("/books", (req, res) => {
  const sql = "SELECT * FROM books";
  const params = [];

  db.all(sql, params, (err, rows) => {
    if (err) {
      res.status(400).json({ Error: err.message });
    }

    res.json({
      message: "success",
      data: rows,
    });
  });
});

app.get('/books/:id', (req, res) => {});

app.listen(4000, (err) => {
  if (err) {
    console.log(`Error starting server: ${err.message}`);
    throw err;
  }
  console.log("Sever listening on port 4000");
});
