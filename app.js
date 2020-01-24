const express = require("express")
const cors = require("cors")
const bodyParser = require("body-parser")
const app = express()
const port = 3000;
//importing routers
// const recipesRouter = require("./routes/recipes/recipes.js")
// const usersRouter = require("./routes/users/users.js")
//middleware attaching
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(cors());
app.use(express())
// app.use("/recipes",recipesRouter)
// app.use("/users",usersRouter)

app.get("/",(req,res)=>{
res.json("Live and Running")
})
const inputstudents ={
subject: "math",
teacher: "Mr. Marvin Bent",
name: "Jill Scott",
city: "NYC",
grade: 0
}
const students= []

app.listen(port,()=>{
    console.log("youre runnin on port", port)
})

app.get("/students",(req,res)=>{
students.push(inputstudents)
res.json(students)

})

