const model = require("../models/books.model");

async function getBooks(req, res) {
  const books = await model.getAll().catch((err) => {
    res.send(err);
  });
  res.send(books);
}

async function getBook(req, res) {
  const book = await model.getOne(req.params.id).catch((err) => {
    res.send(err);
  });
  res.send(book);
}

async function addBook(req, res) {
  const { author, title, genre } = req.body;

  if (!author || !title || !genre) {
    return res.status(400).send("Please input all data");
  }

  const result = await model.add(req.body).catch((err) => {
    res.status(400).send(err);
  });
  res.send(result);
}

async function editBook(req, res) {
  const { author, title, genre } = req.body;

  if (!author || !title || !genre) {
    return res.status(400).send("Please input all data");
  }
  const result = await model.replace(req.body).catch((err) => {
    res.status(400).send(err);
  });
  res.send(result);
}

async function updateBook(req, res) {
  const existingBook = await model.getOne(req.params.id);
  const { author, title, genre } = req.body;

  if (existingBook) {
    const newBook = {
      ...existingBook,
    };

    if (author) {
      newBook.author = author;
    }

    if (title) {
      newBook.title = title;
    }

    if (genre) {
      newBook.genre = genre;
    }

    if (!author || !title || !genre) {
      return res.status(400).send("Fill in author, title and/or genre.");
    }

    await model
      .update(newBook)
      .then((message) => {
        res.send(message);
      })
      .catch((err) => {
        res.status(400).send(err);
      });
  } else {
    res.status(404).send("There is no such book in the library to edit.");
  }
}

async function deleteBook(req, res) {
  const book = await model.getOne(req.params.id);

  if (book) {
    await model
      .remove(book.id)
      .then((message) => {
        res.send(message);
      })
      .catch((err) => {
        res.send(err);
      });
  } else {
    res.status(404).send("There is no such book in the library to delete.");
  }
}

module.exports = {
  getBooks,
  getBook,
  addBook,
  editBook,
  updateBook,
  deleteBook,
};
