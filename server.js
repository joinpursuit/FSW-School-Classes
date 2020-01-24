const School = require('./School');
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');


let mySchool = new School();


const port = process.env.PORT || 4000;

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.get("/school", (req, res) => {
   res.status(200).json({
      status: "success",

   })
})
app.post("/school/class", (req, res) => {
   // console.log(req.body.className)
   res.json(mySchool.addClass(req.body.className, req.body.teacherName))
})

app.listen(port, ()=> {
   console.log(`Server is listening on port ${port}`)
})
