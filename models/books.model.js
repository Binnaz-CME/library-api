const db = require("../config/db");

function getAll() {
  const sql = "SELECT * FROM books";

  return new Promise((resolve, reject) => {
    db.all(sql, (err, rows) => {
      if (err) {
        res.status(400).json({ Error: err.message });
        reject(err)
      }
      resolve(rows);
      console.log(rows)
    });
  });
}

module.exports = {
  getAll,
};
