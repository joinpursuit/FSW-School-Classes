const express = require("express");
const cors = require("cors");
const app = express();
const port = 3000;

const classesRouter = require("./Class.js/index.js");

app.use(cors());

app.use("/classes", classesRouter)


//app.get(/)


app.listen(port,()=>{
  console.log("listening to port " + port)
})