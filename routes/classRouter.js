const classRouter = require("express").Router();
const mySchool = require("./../School.js")
const displayTime = require("./../build.js");



classRouter.post("/",(req,res)=> {
    res.json(req.body);
});


classRouter.post("/add",(req,res)=> {
    let name    = req.body.name;
    let teacher = req.body.teacher;
    
    if(mySchool.classes[name]){
        res.json({
            "error": "Please fill out all the information or Class already exists",
            "timestamp": displayTime()
        })
    } else {
        mySchool.addClass(name,teacher);

        res.json({
            "class": mySchool.classes[name],
            "message": "Created a new class",
            "timestamp": displayTime()
        })
    }
});


classRouter.post("/:className/enroll",(req,res)=> {
    let className = req.params.className;
    let studentName = req.body.name;
    let studentAge = req.body.age;
    let studentCity = req.body.city;
    let studentGrade = req.body.grade;
    let studentsArr = mySchool.classes[className].students
    
    studentsArr.forEach(student => {
        if(studentName === "" || studentAge === "" || studentCity === ""){
            res.json({
                "error": "Please fill out all the information for the student",
                "timestamp": displayTime()
            })
        }else if(student.name === studentName){
            student.name = studentName;
            student.age = studentAge;
            student.city = studentCity;
            student.grade = studentGrade;
        } else{
            let result = mySchool.enrollStudent(className,studentName,studentAge,studentCity);
            res.json({
                "student": result,
                "className": className,
                "message": "Enrolled Student",
                "timestamp": displayTime()
            })
            
        } 
        
    });

    
   

})





module.exports = classRouter;