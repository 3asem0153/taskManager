const express = require("express");
const db = require("./database");
const cors = require("cors");

const port = 3000;

const insert = db.prepare("INSERT INTO users (email,password) VALUES (?,?)");

const app = express();
app.use(cors());
app.use(express.json());

app.post("/sign-up", (req, res) => {
  insert.get(req.body.email, req.body.password);
  res.send(db)

})

app.listen(port, () => {
  console.log(`server running in http://localhost:${port}`)
})