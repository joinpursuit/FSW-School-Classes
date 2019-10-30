const express = require('express');
const app = express();
const port = 3000; 
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
    res.send('what')
})

// creating a new class
app.post('/class', (req,res)=>{
    let className = req.body.name
    let teacher = req.body.teacher
    console.log( className, teacher)
    
    
        if(!mySchool.classes[className]){
            let newClass = mySchool.addClass(className,teacher)
            res.json(newClass)
        } else{
            // res.status(404)
            let time = new Date();
            res.json({
               'error': 'Please fill out all the information or Class already exists',
               'timestamp':  time.toISOString()
            })
        }
    } )

app.listen(port, ()=>{
    console.log(`Listening on http://localhost:${port}`)
})