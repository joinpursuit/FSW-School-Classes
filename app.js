const express = require("express")
const cors = require("cors")
const app = express();
const bodyParser = require("body-parser")
const port =3000;
const school = require("./School.js")
app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:false}))

let newSchool = new school ()
// console.log(newSchool)

app.get("/school",(req,res)=>{
    res.json(newSchool.classes)
})
app.post("/school/add/class",(req,res)=>{
    try{
        let classAdd =newSchool.addClass(req.query.name,req.query.teacher)
        res.json({ 
            "class": { "name": req.query.name, "teacher": req.query.teacher, "students": []},
            "message": "Created a new class",
            "timestamp": timeStamp()
          })
    }catch(err){
        res.json(
            { "error": err +"Please fill out all the information or Class already exists",
            "timestamp": timeStamp()
        }
        )
    }
})
app.post("/school/add/student/:class",(req,res)=>{
    try{
        newSchool.enrollStudent(req.params.class,req.body)
        res.json(
            {"student": { "name": req.body.name, "age": req.body.age, "city": req.body.city, "grade": req.body.grade },
        "className": req.params.class,
        "message": "Enrolled Student",
        "timestamp": timeStamp()}
        )
    }catch(err){
        res.json(
            { "error":  "Please fill out all the information for the student",
            "timestamp": timeStamp()
        }
        )
    }
})

app.get("/",(req,res)=>{
    res.json("making requesting on / url")
})


app.listen(port,()=>{
    console.log("Listing on port ", port)
})

const timeStamp = ()=>{
let time = new Date()
return time.getFullYear()+" "+time.getMonth()+1+"/"+time.getDate()+" "+time.getHours()+":"+time.getMinutes()+" "+time.getSeconds()
}
// timeStamp()