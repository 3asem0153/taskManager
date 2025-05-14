const express = require("express");
const db = require("./database");
const cors = require("cors");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const cookieParser = require('cookie-parser');

const port = 4000;
const app = express();
app.use(cors({
  origin:"http://localhost:3000",
  credentials:true
}));
app.use(express.json());
app.use(cookieParser())


const addUser = db.prepare("INSERT INTO users (email,password) VALUES (?,?)");
const addTask = db.prepare("INSERT INTO tasks (id,inid,sub,cont) VALUES (?,?,?,?)");
const getTasks = db.prepare("SELECT * FROM tasks WHERE id = ?");
const editTask = db.prepare("UPDATE tasks SET sub = ? , cont = ? WHERE inid = ? ");
const getUser = db.prepare("SELECT id FROM users WHERE email = ? AND password=?");
const dlt = db.prepare("DELETE FROM tasks WHERE inid = ?");
const getUsers=db.prepare("SELECT * FROM users");




app.post("/sign-up", (req, res) => {
  if(!req.body.email||!req.body.password){
   return res.status(400).json({
      message:"Email and password are required"
    })
  }
  try {
    const info = addUser.run(req.body.email, req.body.password);

    const accessToken=jwt.sign(
      {email:req.body.email},
      process.env.ACCESS_TOKEN_SECRET,{expiresIn:'30s'} 
    );
    const refreshToken=jwt.sign(
      {email:req.body.email},
      process.env.REFRESH_TOKEN_SECRET,{expiresIn:'60s'} 
    );

    res.cookie("jwt",refreshToken,{
      httpOnly:true,
      maxAge:24*60*60*1000
    })

    res.status(201).json({
      message: "user added successfully", id: info.lastInsertRowid,accessToken
    })} 

    catch(err){
    if (err.code==="SQLITE_CONSTRAINT"){
      return res.status(409).json({message:"email already registered"}) 
    }
    return res.status(500).json({message:"server error none of the above"})
  }
 

})
app.post('/logout',(req,res)=>{
  res.clearCookie("jwt",{
    httpOnly:true
  })
  res.status(200).json({message:"logged out successfully"})
})

const authenticateToken = (req,res,next)=>{
  const token = req.headers["authorization"]?.split(" ")[1];
  if(!token){
    return res.status(403).json({message:"access denied:no token provided"})
  }
  jwt.verify(token,process.env.ACCESS_TOKEN_SECRET,(err,user)=>{
    if (err){
     return res.status(403).json({message:"invalid or expired token"})
    }
    req.user=user;
    next()
  })
}

app.post("/refresh",(req,res)=>{
  const refreshToken=req.cookies.jwt;
  if (!refreshToken){
    return res.status(403).json({
      message:"refresh token is required"
    })
  }
  jwt.verify(refreshToken,process.env.REFRESH_TOKEN_SECRET,(err,user)=>{
    if(err){res.status(403).json({message:"invalid refresh token"})}
    const newAccessToken=jwt.sign(
      {email:user.email},
      process.env.ACCESS_TOKEN_SECRET,
      {expiresIn:"30s"}
    )
    res.json({
      accessToken:newAccessToken
    })
  })
})

app.post("/home/:id",authenticateToken, (req, res) => {
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

if(!req.body.email||!req.body.password){
   return res.status(400).json({
      message:"Email and password are required"
    })
  }
  try {

    const user = getUser.get(req.body.email,req.body.password);

    const accessToken=jwt.sign(
      {email:req.body.email},
      process.env.ACCESS_TOKEN_SECRET,{expiresIn:'30s'} 
    );
    const refreshToken=jwt.sign(
      {email:req.body.email},
      process.env.REFRESH_TOKEN_SECRET,{expiresIn:'60s'} 
    );

    res.cookie("jwt",refreshToken,{
      httpOnly:true,
      maxAge:24*60*60*1000
    })

    res.status(201).json({
      message: "logged in successfully", id:user.id ,accessToken
    })} 

    catch(err){
    return res.status(500).json({message:"server error none of the above"})
  }
 

})


  
  


  app.patch("/home/:id",authenticateToken, (req, res) => {
    const update = editTask.run(req.body.sub , req.body.cont,req.body.inid);
    if (update.changes === 0){
      res.status(404).json({message:"task not edited"})
    }
    res.json({
      message:"task updated"
    })
  })

  app.delete("/home/:id",authenticateToken, (req, res) => {
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

app.get("/", (req, res) => {
  const users = getUsers.all()
  res.send(
    users
  )
})







    
