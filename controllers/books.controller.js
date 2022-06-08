const model = require("../models/books.model");

async function getBooks(req, res) {
  const result = await model.getAll();
  res.send(result);
}

async function getBook(req, res) {
  const result = await model.getOne(req.params.id);
  res.send(result);
}

async function addBook(req, res) {
  const result = await model.add(req.body);
  res.send(result);
}
async function editBook(req, res) {
  const result = await model.editOne(req.body);
  console.log("result", result);
  res.send(result);
}

module.exports = {
  getBooks,
  getBook,
  addBook,
  editBook,
};
