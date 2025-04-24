const express = require("express");
const db = require("./database");
const cors = require("cors");

const port = 3000;

const insert = db.prepare("INSERT INTO users (email,password) VALUES (?,?)");

const app = express();
app.use(cors());
app.use(express.json());

app.post("/home", (req, res) => {
    insert.get(req.body.email, req.body.password)

})

app.listen(port, () => {
    console.log(`server running in http://localhost:${port}`)
})
