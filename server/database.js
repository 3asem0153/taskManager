import express from "express";
import cors from "cors";
const app = express();
app.use(cors());
app.listen(4000, ()=> {
  console.log("hi im the port")
})
app.get("/api", (req, res)=> {
  console.log(req.hostname);
  res.send("ana")
})