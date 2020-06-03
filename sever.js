const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 4373;
const School = require('./School.js');
const Student = require('./Student');
const Class = require('./Class');




app.use(bodyParser.urlencoded({
    extended: false
}));

app.use(bodyParser.json());

let mySchool = new School();


let peter = new Student("Peter", "25", "ny", "79");
console.log(peter)
  let newClass = new Class('chem', 'brown');
console.log(newClass)


app.listen(port, () => {
    console.log(`Listening to port ${port}`);
});