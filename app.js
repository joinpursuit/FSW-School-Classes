const express = require("express");
const cors = require("cors")
const bodyParser = require("body-parser");
const app = express();
const port = 4000;
const School = require("./School");
const Class = require('./Class');
const Student = require('./Student')



app.use(cors());
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json())

let mySchool = new School();

const checkClassName = (request,response,next)=>{
if(!request.body.name||!request.body.teacher){
    response.json({
        error:"not valid data"
    })
}else{
    next()
}
}
const addClass =(request,response)=>{
    let newClass = mySchool.addClass(request.body.name,request.body.teacher)
    if(newClass=== newClass){
        response.json({
            error:"class exist",
            time: new Date()
        })
    }else{
        response.json({
            class: newClass,
            message: "created new class",
            time: new Date()
        })
    }

}
const ifRepeated =(request,response,next)=>{
let className = request.params.nameOfClass
if(mySchool.classes[className]){
    response.json({
        error:"class exists",
        time: new Date()
    })
}

}
const enrollStudent=(request,response)=>{

}
const classExist=(request,response,next)=>{
    let className = (request.params.nameOfClass)
    if(!mySchool.classes[className]){
        response.json({

        })
    }else{
        next()
    }
}
const studentExist=(request,response,next)=>{

}
const studentBody=(request,response)=>{
    

}

app.post("/class",checkClassName,addClass,ifRepeated)
app.post("/class/:className",classExist,enrollStudent,studentExist)
app.get("/class/:className/students",classExist,studentBody)

app.listen(port,()=>{
    console.log("server is running", port)
})