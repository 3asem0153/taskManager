
const Database = require("better-sqlite3");
const db = new Database("data.db");

db.exec(`CREATE TABLE IF NOT EXISTS users (id INTEGER PRIMARY KEY AUTOINCREMENT , email TEXT NOT NULL UNIQUE , password TEXT NOT NULL)`);
const rowCount = db.prepare("SELECT COUNT(*) AS count FROM users").get().count;


module.exports = db;