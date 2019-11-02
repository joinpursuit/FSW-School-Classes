const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')

const School = require('./School')
const Class = require('./Class')
const Student = require('./Student')

const app = express()
app.use(cors())
app.use(bodyParser())

const port = 3030

let school = new School()

app.post('/class', (req,res) => {
  let name = req.body.name
  let teacher = req.body.teacher
  if (school.classes[name] !== undefined || name === undefined || teacher === undefined) {
    res.json({
      'error': 'Please fill out all the information or Class already exists'
    })
  } else {
    school.addClass(name, teacher)
    res.json({
      'class': {'name': name, 'teacher': teacher, 'students':[]},
      'message': 'Created a new class'
    })
  }
})

app.post('/class/:name/enroll', (req,res) => {
  let className = req.params.name
  let student = req.body
  if (student.name === undefined || student.age === undefined || student.city === undefined || student.grade === undefined) {
    res.json({
      'error': 'Please fill out all the information'
    })
  } else {
    school.enrollStudent(className, student)
    res.json({
      'student': {'name': student.name, 'age': student.age, 'city': student.city, 'grade': student.grade},
      'className': className,
      'message': 'Enrolled Student'
    })
  }
})

app.get('/class/:name/students', (req,res) => {
  let className = req.params.name
  let query = req.query
  if (school.classes[className] === undefined) {
    res.json({
      'error': 'Class does not exist'
    })
  } else if (query.failing === 'true') {
    res.json({
      'students': school.getStudentsByClassWithFilter(className),
      'message': 'Retrieved Students'
    })
  } else {
    res.json({
      'students': school.getStudentsByClass(className),
      'message': 'Retrieved Students'
    })
  }
})

app.listen(3030, () => {
  console.log('listening')
})
