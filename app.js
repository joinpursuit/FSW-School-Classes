const express = require("express");
const cors = require("cors");
const app = express();
const port = 3000;

const school = require("./School");


app.use(cors());



app.get("/", (req, res)=>{
  res.send("you made request")
})


app.listen(port,()=>{
  console.log("listening to port " + port)
})
