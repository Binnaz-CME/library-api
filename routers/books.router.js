const express = require("express");
const morgan = require("morgan");

const booksController = require("../controllers/books.controller");
const booksRouter = express.Router();

booksRouter.use(morgan("dev"));

booksRouter.get("/", booksController.getBooks);
booksRouter.get("/:id", booksController.getBook);
booksRouter.post("/", booksController.addBook);
booksRouter.put("/:id", booksController.editBook);

module.exports = booksRouter;
