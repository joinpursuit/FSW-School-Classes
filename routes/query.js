const query = require("express").Router();



const students = [
    {
        subject: "Science",
        teacher: "Mrs. Rivera",
        name: "Shamel Jones",
        city: "Brooklyn",
        grade: 0
        },
        {
            subject: "Art",
            teacher: "Mrs. Falu",
            name: "Madden Whitfield",
            city: "Brooklyn",
            grade: 0
            },
            {
                subject: "math",
                teacher: "Mr. Marvin Bent",
                name: "Jill Scott",
                city: "NYC",
                grade: 0
                }

]

const info ={
    subject: "math",
    teacher: "Mr. Marvin Bent",
    name: "Jill Scott",
    city: "NYC",
    grade: 0
    }
  


query.get("/",(req,res)=>{
   console.log("success")
students.push(info)
   res.json(students)
      })

      query.get("/search/:id",(req,res)=>{
        console.log("success")
   students.forEach ((el=>{
       if (el.name === req.params.id){
res.json(el)
       }
   }))
           })

  

  




module.exports = query;
