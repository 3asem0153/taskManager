const express = require("express");
const db = require("./database");
const cors = require("cors");

const port = 3000;


const app = express();
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
    const all = db.prepare("SELECT * FROM users").all();
    res.send(all)

})

app.listen(port, () => {
    console.log(`server running in http://localhost:${port}`)
})
