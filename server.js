const School = require('./School');

let mySchool = new School();

const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const classRouter = require('./routes/class/classRouter.js')
const studentRouter = require('./routes/student/studentRouter.js')

const port = 4000;

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.use("/classes", classRouter);
app.use("/students", studentRouter);


app.listen(port, ()=> {
   `Server is listening on port ${port}`
})