const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database(':memory:');

db.serialize(() => {
    db.run(`CREATE TABLE users (
        id TEXT PRIMARY KEY,
        email TEXT UNIQUE,
        username TEXT,
        tel TEXT UNIQUE,
        password TEXT
    )`);
});

module.exports = db;
