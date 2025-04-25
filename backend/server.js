const express = require("express");
const db = require("./database");
const cors = require("cors");

const port = 4000;
const app = express();
app.use(cors());
app.use(express.json());

const addUser = db.prepare("INSERT INTO users (email,password) VALUES (?,?)");
const addTask = db.prepare("INSERT INTO tasks (sub,cont) VALUES (?,?)");


app.post("/sign-up/", (req, res) => {
  const info = addUser.run(req.body.email, req.body.password);
  res.status(201).json({ message: "user added successfully", id: info.lastInsertRowid })
})

app.get("/", (req, res) => {

  const data = db.prepare("SELECT * FROM users").all();
  res.send(data)
})

app.listen(port, () => {
  console.log(`server running in http://localhost:${port}`)
})