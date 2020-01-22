const express = require("express");
const cors = require("cors");
const timestamp = require("timestamp");
const app = express();
const bodyParser = require("body-parser");
const School = require("./School");

const port = 3000;

let mySchool = new School()


app.use(cors());
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: false}));

const showAllClasses = (req, res) => {
  res.json({
   allClasses: mySchool.classes
  })
}

const checkIfClassExists = (req, res, next) => {
  //console.log(mySchool.classes[req.body.name])
  if(mySchool.classes[req.body.name]){

    res.json({
      status: 200,
      error: "Please fill out all the information or Class already exists",
      timestamp: req.timestamp
    })
} else{
  next()
}
}

const addNewClass =(req, res) => {
  let addedClass = mySchool.addClass(req.body.name, req.body.teacher)
  res.json({
    status: 200,
    newClass: addedClass,
    message: "Created a new class",
    timestamp: "YYYY, MM/DD HH:MM:SS"
    // timestamp :req.timestamp
  })


}

app.get("/class", showAllClasses);
app.post("/class", checkIfClassExists, addNewClass)

app.listen(port,()=>{
  console.log("listening to port " + port)
})
