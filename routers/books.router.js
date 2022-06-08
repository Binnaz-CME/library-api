const express = require("express");
const morgan = require("morgan");

const booksController = require('../controllers/books.controller')
const booksRouter = express.Router();

booksRouter.use(morgan("dev"));

booksRouter.get("/", booksController.getBooks);

module.exports = booksRouter;
