const express = require('express');
const router = express.Router();

const bodyParser = require('body-parser')
router.use(bodyParser.urlencoded({extended: false}));
router.use(bodyParser.json());

const School = require('./School')
let mySchool = new School();


router.get('/', (req, res) => {
    res.send('Get request received')
});

mySchool.addClass("Astronomy", "Mr.Bob")

router.post('/', (req, res) => {
  let className = req.body.name 
  let classteacher = req.body.teacher 
  let date = new Date();
 
  if (!mySchool.classes[className]) {
    let result = mySchool.addClass(className, classteacher)
    res.json({
      "class" : result,
      "message" : "Created a new class",
      "timestamp" : date.getDate()
      })
  } else {
    res.status(404)
    res.json({
      "error": "Please fill out all the information or Class already exists",
     "timestamp": date.getDate()
      })
  }
//console.log(mySchool.classes)
})

router.post('/:classname/enroll', (req, res) => {
  let studentName = req.body.name 
  let studentAge = req.body.age 
  let studentCity = req.body.city 
  let studentGrade = req.body.grade 

  
})






module.exports = router;