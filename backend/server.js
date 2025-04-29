const express = require("express");
const db = require("./database");
const cors = require("cors");

const port = 4000;
const app = express();
app.use(cors());
app.use(express.json());

const addUser = db.prepare("INSERT INTO users (email,password) VALUES (?,?)");
const addTask = db.prepare("INSERT INTO tasks (id,sub,cont) VALUES (?,?,?)");
const getTasks = db.prepare("SELECT * FROM tasks WHERE id = ?")


app.post("/sign-up/", (req, res) => {
  const info = addUser.run(req.body.email, req.body.password);
  res.status(201).json({
    message: "user added successfully", id: info.lastInsertRowid
  })
})

app.post("/home/:id", (req, res) => {
  addTask.run(req.body.id, req.body.sub, req.body.cont);
  const data = getTasks.all(req.body.id)
  res.status(201).json({
    message: "task added successfully to database", tasks:data
  })
})


app.get("/home/:id", (req, res) => {
  const tasks = getTasks.all(req.params.id)
  res.json({
    data: tasks
  })
})




app.listen(port, () => {
  console.log(`server running in http://localhost:${port}`)
})