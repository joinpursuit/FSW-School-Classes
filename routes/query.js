const query = require("express").Router();

const students = [
    {
        subject: "Science",
        teacher: "Mrs. Rivera",
        name: "Shamel Jones",
        city: "Brooklyn",
        gpa: 0,
        dob: "08/12/77"
        },
        {
            subject: "Art",
            teacher: "Mrs. Falu",
            name: "Madden Whitfield",
            city: "Brooklyn",
            gpa: 0,
            dob: "08/12/79"
            },
            {
                subject: "Math",
                teacher: "Mr. Marvin Bent",
                name: "Jill Scott",
                city: "NYC",
                gpa: 0,
                dob: "02/12/97"
                }, 
                {
                    subject: "Math",
                    teacher: "Mr. Marvin Bent",
                    name: "Bill Scott",
                    city: "The Bronx",
                    gpa: 0,
                    dob: "03/12/97",                   
                   }
]


query.get("/",(req,res)=>{
        console.log("hello")
    res.json("hey")
})

query.get("/search/:id",(req,res)=>{
let nameSearch = req.params.id
    students.forEach((el)=>{
        if(el.name === nameSearch){
        res.json(el)
        }
    })
})

query.get("/specialsearch/",(req,res)=>{
res.json(students)
})

query.get("/students", (req,res)=>{
    res.json(students)
})


query.post("/students", (req,res)=>{
console.log(req.body)
    students.push(req.body)
    res.json(req.body)
})







  //, {name: name.value,age:age.value}).then

  







module.exports = query;
