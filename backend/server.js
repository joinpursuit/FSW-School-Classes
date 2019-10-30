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

    console.log( className, teacher)
    
    
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

app.listen(port, ()=>{
    console.log(`Listening on http://localhost:${port}`)
})