
const Database = require("better-sqlite3");
const db = new Database("data.db");

db.exec(`CREATE TABLE IF NOT EXISTS users (id INTEGER PRIMARY KEY AUTOINCREMENT , name TEXT NOT NULL)`);
const rowCount = db.prepare("SELECT COUNT(*) AS count FROM users").get().count;

if (rowCount === 0) {
    const insert = db.prepare("INSERT INTO users (name) VALUES (?)");
    const users = ["3asem", "mo", "mustafa"];
    users.forEach(user => insert.run(user));
}

module.exports = db;