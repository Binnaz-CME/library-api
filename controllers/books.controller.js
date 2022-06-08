const model = require('../models/books.model')
console.log(model)

async function getBooks(req, res) {
    const result = await model.getAll();
    console.log(result)
    res.send(result);
}

module.exports ={
    getBooks,
}