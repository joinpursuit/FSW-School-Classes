const School = require('./School');
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');


let mySchool = new School();


const port = 4000;

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.get("/class", (req, res) => {
   res.status(200).json({
      status: "success",
      roster: mySchool.classes
   })
})
const validateClass = (req, res, next) => {
   let name = req.body.name;
   let teacher = req.body.teacher;
   if(!name || !teacher || mySchool.classes[name]) {
      res.status(400).json({
         status: "bad request",
         message: "Please fill out all the information or Class already exists",
         timestamp: new Date()
      })
      return
   } else {
      next()
   }
}

app.post("/class", validateClass, (req, res) => {
   res.status(200).json({
      status: "success",
      message: "You created a class",
      class: mySchool.addClass(req.body.name, req.body.teacher),
      timestamp: new Date()
   })
})

app.listen(port, ()=> {
   console.log(`Server is listening on port ${port}`)
})
