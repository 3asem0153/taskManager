const express = require("express");
const db = require("./database");
const cors = require("cors");

const port = 4000;
const app = express();
app.use(cors());
app.use(express.json());

const addUser = db.prepare("INSERT INTO users (email,password) VALUES (?,?)");
const addTask = db.prepare("INSERT INTO tasks (id,inid,sub,cont) VALUES (?,?,?,?)");
const getTasks = db.prepare("SELECT * FROM tasks WHERE id = ?");
const editTask = db.prepare("UPDATE tasks SET sub = ? , cont = ? WHERE inid = ? ");
const getUser = db.prepare("SELECT id FROM users WHERE email = ? AND password=?");
const dlt = db.prepare("DELETE FROM tasks WHERE inid = ?");

app.post("/sign-up/", (req, res) => {
  const info = addUser.run(req.body.email, req.body.password);
  res.status(201).json({
    message: "user added successfully", id: info.lastInsertRowid
  })
})

app.post("/home/:id", (req, res) => {
  addTask.run(req.body.id,req.body.inid, req.body.sub, req.body.cont);
  const tasks = getTasks.all(req.body.id)
  res.status(201).json({
    message: "task added successfully to database", tasks:tasks
  })
})


app.get("/home/:id", (req, res) => {
  const tasks = getTasks.all(req.params.id)
  res.json({
    tasks:tasks
  })
})

app.post("/", (req, res) => {
  const user = getUser.get(req.body.email,req.body.password);
  res.json({id:user.id})
  })


  app.patch("/home/:id", (req, res) => {
    const update = editTask.run(req.body.sub , req.body.cont,req.body.inid);
    if (update.changes === 0){
      res.status(404).json({message:"task not edited"})
    }
    res.json({
      message:"task updated"
    })
  })

  app.delete("/home/:id", (req, res) => {
    const result = dlt.run(req.body.inid);
    if (result.changes === 0){
      res.status(400).json({
        message:"failed to find id"
      })
    }
  })


app.listen(port, () => {
  console.log(`server running in http://localhost:${port}`)
})

app.get("/home/:id", (req, res) => {
  const tasks = getTasks.all(req.params.id)
  res.send(
    tasks
  )
})