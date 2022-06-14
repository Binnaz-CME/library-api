const db = require("../config/db");

function getAll() {
  const sql = "SELECT * FROM books";

  return new Promise((resolve, reject) => {
    db.all(sql, (err, rows) => {
      if (err) {
        reject(`Error: ${err.message}`);
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
        reject(`Error: ${err.message}`);
      }
      resolve(rows);
    });
  });
}

function add(book) {
  const sql = "INSERT INTO books (author, title, genre) VALUES (?, ?, ?)";

  return new Promise((resolve, reject) => {
    db.run(sql, [book.author, book.title, book.genre], (err) => {
      if (err) {
        reject(`Error: ${err.message}`);
      }
      resolve(
        `Library successfully updated with the book; '${book.title}' by '${book.author}'.`
      );
    });
  });
}

function replace(book) {
  const sql =
    "UPDATE books SET author = $author, title = $title, genre = $genre WHERE id = $id";

  return new Promise((resolve, reject) => {
    db.run(
      sql,
      {
        $author: book.author,
        $title: book.title,
        $genre: book.genre,
        $id: book.id,
      },
      (err) => {
        if (err) {
          reject(`Error: ${err.message}`);
        }
        resolve(
          `Book was successfully edited to title: '${book.title}', author: '${book.author}', genre: '${book.genre}'`
        );
      }
    );
  });
}

function update(newBook) {
  console.log("book from model", newBook);
  const sql =
    "UPDATE books SET author = $author, title = $title, genre = $genre WHERE id = $id";
  return new Promise((resolve, reject) => {
    db.run(
      sql,
      {
        $author: newBook.author,
        $title: newBook.title,
        $genre: newBook.genre,
        $id: newBook.id,
      },
      (err) => {
        if (err) {
          reject(`Error: ${err.message}`);
        }
        resolve(`Book with id ${newBook.id} was updated.`);
      }
    );
  });
}

function remove(id) {
  const sql = "DELETE FROM books WHERE id = ?";
  return new Promise((resolve, reject) => {
    db.run(sql, id, (err) => {
      if (err) {
        reject(`Error: ${err.message}`);
      }
      resolve(`Book with id ${id} was successfully deleted.`);
    });
  });
}

module.exports = {
  getAll,
  getOne,
  add,
  replace,
  update,
  remove,
};
