const express = require("express");
const app = express();
const port = 4000;
const bodyParser = require("body-parser");
const cors = require("cors")
const Class = require("./Class");
const School = require("./School");
const Student = require("./Student");

app.use(cors());
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser())
const classRoute = require("./routes/classes")
app.use("/classes", classRoute)


app.listen(port,()=>{
    console.log("server is running", port)
})