const query = require("express").Router();



const students = [
    {
        subject: "Science",
        teacher: "Mrs. Rivera",
        name: "Shamel Jones",
        city: "Brooklyn",
        grade: 0,
        DOB: "08/12/77"
        },
        {
            subject: "Art",
            teacher: "Mrs. Falu",
            name: "Madden Whitfield",
            city: "Brooklyn",
            grade: 0,
            DOB: "08/12/79"
            },
            {
                subject: "Math",
                teacher: "Mr. Marvin Bent",
                name: "Jill Scott",
                city: "NYC",
                grade: 0,
                DOB: "02/12/97"
                }, 
                {
                    subject: "Math",
                    teacher: "Mr. Marvin Bent",
                    name: "Bill Scott",
                    city: "The Bronx",
                    grade: 0,
                    DOB: "03/12/97"
                    }
]



let roster = []
let scienceRoster = []
let mathRoster = []

const subinfo ={
Math: "Mr. Marvin Bent, Math",
Art: "Mrs. Falu, Art",
Science: "Mrs. Rivera, Science"
}

query.get("/",(req,res)=>{
   console.log("success")
students.push(info)
   res.json(students)
      })

query.get("/search/:id",(req,res)=>{
        console.log(req.params.id)
   students.forEach ((el=>{
       if (el.name === req.params.id){
res.json(el) 
       }else{res.json({status: "not found"})}
            }))
})

query.get("/subjects",(req,res)=>{
    console.log(subinfo)
res.json(subinfo)
})

query.get("/subject/:id",(req,res)=>{
    students.forEach((el)=>{
        if(el.subject === req.params.id){
          roster.push(el)
        }   
    })
   let allsubs = Object.keys(subinfo)
   let subquery = req.params.id
 for (let sub of allsubs){
     if(subquery.includes(sub)){
res.json({class:subinfo[sub], roster:roster.length} )
     }
   }
})
 







query.post("/input",(req,res)=>{
    console.log(req.body);
    students.push(req.body)
    res.json(req.body); 
})




  //, {name: name.value,age:age.value}).then

  







module.exports = query;
