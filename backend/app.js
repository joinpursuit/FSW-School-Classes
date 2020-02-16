const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser")
const port = 3000;
const app = express();
const {addNewClass,addNewStudent,getAllClasses,studentsByClass} = require( "../backend/Queries/middlewear")




app.use(cors());
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json())
app.listen(port, () => {
    console.log("Listening to port ", port)
})




app.get("/school",getAllClasses)
app.post("/school/class", addNewClass)
app.post("/school/:className/enroll",addNewStudent)


app.get("/school/:className/students/", studentsByClass)

