const sqlite3 = require("sqlite3").verbose();

const db = new sqlite3.Database("./db.sqlite", (err) => {
  if (err) {
    console.log(err.message);
    throw err;
  }

  const library = `
    CREATE TABLE books (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        author TEXT,
        title TEXT,
        genre TEXT
        )
    `;

  db.run(library, (err) => {
    if (err) {
      console.log(err.message);
    } else {
      const insert =
        "INSERT INTO books (author, title, genre) VALUES (?, ?, ?)";

      db.run(insert, ["Nora Roberts", "Nightwork", "Thrillers"]);
    }
  });
});

module.exports = db;
