const db = require("../config/db");

function getAll() {
  const sql = "SELECT * FROM books";

  return new Promise((resolve, reject) => {
    db.all(sql, (err, rows) => {
      if (err) {
        res.status(400).json({ Error: err.message });
        reject(err);
      }
      resolve(rows);
    });
  });
}

function getOne(id) {
  const sql = "SELECT * FROM books WHERE id = ?";

  return new Promise((resolve, reject) => {
    db.get(sql, id, (err, rows) => {
      if (err) {
        res.status(400).json({ Error: err.message });
        reject(err);
      }
      resolve(rows);
    });
  });
}

function add(book) {
  const insert = "INSERT INTO books (author, title, genre) VALUES (?, ?, ?)";

  return new Promise((resolve, reject) => {
    db.run(insert, [book.author, book.title, book.genre], (err) => {
      if (err) {
        res.status(400).json({ Error: err.message });
        reject(err);
      }
      resolve(
        `Library successfully updated with the book; '${book.title}' by '${book.author}'.`
      );
    });
  });
}

function editOne(book) {
  const update =
    "UPDATE books SET author = $author, title = $title, genre = $genre WHERE id = $id";

  return new Promise((resolve, reject) => {
    db.run(
      update,
      {
        $author: book.author,
        $title: book.title,
        $genre: book.genre,
        $id: book.id,
      },
      (err) => {
        if (err) {
          res.status(400).json({ Error: err.message });
          reject(err);
        }
        resolve(
          `Book successfully edited to title: '${book.title}', author: '${book.author}', genre: '${book.genre}'`
        );
      }
    );
  });
}

module.exports = {
  getAll,
  getOne,
  add,
  editOne,
};
