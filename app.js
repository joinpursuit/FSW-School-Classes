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
            "timestamp": "YYYY, MM/DD HH:MM:SS"
          })
    }catch(err){
        res.json(
            { "error": err +"Please fill out all the information or Class already exists",
            "timestamp": "YYYY, MM/DD HH:MM:SS"
        }
        )
    }
    // newSchool.addClass(name, teacher) {
    // let newClass = new Class(name, teacher);
    // this.classes[name] = newClass;
    // }

    // let classAdd = new Class(req.query.name, req.query.teacher, req.query.student);
})
// const schoolRouter=require("./School.js")
// app.use("/school",schoolRouter)

app.get("/",(req,res)=>{
    res.json("making requesting on / url")
})



app.listen(port,()=>{
    console.log("Listing on port ", port)
})