const express = require('express');
const app = express();
const port = 3030; 
const cors = require('cors');
const mySchool = require('./school.js')


//app level middleware
app.use(cors());
app.use(express.urlencoded({
    extended: true
}))
app.use(express.json())

//routes
app.get('/class', (req, res)=>{
    let classes = mySchool.classes
    res.send(classes)
})

//creating a new class
 app.post('/class', (req,res)=>{
    let className = req.body.name
    let teacher = req.body.teacher
    let time = new Date();
        if(!mySchool.classes[className]){
            let newClass = mySchool.addClass(className,teacher)
            res.json({
                'classes': mySchool.classes[className],
                'message': className,
                'timestamp': time.toISOString()
            })
        } else{
            res.status(404)
            res.json({
               'error': 'Please fill out all the information or Class already exists',
                'timestamp':  time.toISOString()
             })
       }
    } )



const enrollNewStudent = (req, res, next) =>{
    let className = req.params.className
    let name = req.body.name
    let city = req.body.city
    let age = req.body.age
    let grade = req.body.grade
    let time = new Date();
    let student = {
        name, 
        age, 
        city, 
        grade
    }

    if(!mySchool.classes[className].student){
        let newStudent = mySchool.enrollStudent(className, student)
        res.json({
            'student': student,
            'className': mySchool.classes[className], 
            'message' :'Enrolled Student',
            'timestamp': time.toISOString()
        })
    } else if(mySchool.classes[className].student[student]){
        next();
    }
}

const updateStudent =(req, res, next)=>{
    if(mySchool.classes[className].student[student].name){
        res.json({
            'student': student, 
            'className' : mySchool.classes.student[student],
            'message' : 'Student info has been updated',
            'timestamp': time.toISOString()

        })
    } else {
        next();
    }
}

const studentError = (req, res, next) =>{
        res.json({
            'error' : 'Please fill out all the information for the student',
            'timestamp': time.toISOString()
        })
}

// enrolling students in class and updates info
app.post('/class/:className/enroll', enrollNewStudent, updateStudent, studentError)


app.get('/class/:className/students', (req,res,next)=>{

})

app.listen(port, ()=>{
    console.log(`Listening on http://localhost:${port}`)
})