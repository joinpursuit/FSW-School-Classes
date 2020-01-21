const express = require("express");
const cors = require("cors");
const app = express();
const bodyParser = require("body-parser")
const port = 3000;
const School = require("./School");

let mySchool = new School()


app.use(cors());
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json())

const showAllClasses = (req, res) => {
  res.json({
   allClasses: mySchool.classes
  })
}

const checkIfClassExists = (req, res, next) => {
  if(mySchool.class[req.body.name]){
    //res.
  
} else{
  next()
}
}

const addNewClass =(req, res) => {
  let addedClass = mySchool.addClass(req.body.name, req.body.teacher)
  res.json({
    status: 200,
    message: "Added new class",
    newClass: addedClass
  })


}

app.get("/class", showAllClasses);
app.post("/class", checkIfClassExists, addNewClass)

app.listen(port,()=>{
  console.log("listening to port " + port)
})
