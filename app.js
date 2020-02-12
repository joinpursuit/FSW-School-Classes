const express = require("express");
const cors = require("cors")
const bodyParser = require("body-parser");
const app = express();
const port = 4000;
const School = require("./School");


app.use(cors());
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json())
let mySchool = new School();
const classRoute = require("./routes/classes")
app.use("/classes", classRoute)


app.listen(port,()=>{
    console.log("server is running", port)
})