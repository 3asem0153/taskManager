
const Database = require("better-sqlite3");

const db = new Database("data.db");

db.exec(`CREATE TABLE IF NOT EXISTS users (id INTEGER PRIMARY KEY AUTOINCREMENT ,email TEXT NOT NULL UNIQUE ,password TEXT NOT NULL)`);
db.exec(`CREATE TABLE IF NOT EXISTS tasks (id INTEGER ,inid INTEGER ,sub TEXT NOT NULL ,cont TEXT)`);

module.exports = db;