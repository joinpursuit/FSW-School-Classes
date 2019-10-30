const express = require('express');
const router = express.Router();
const classes = require('./class.js')
const mySchool = require('./school.js')
const students = require('./student.js')

router.get('/', (req,res)=>{
        res.send('this is the classes inventory')
    })
    
router.post('/', (req,res)=>{
    let className = req.body.name
    let teacher = req.body.teacher
    console.log( className, teacher)
    // let newClass = mySchool.addClass(classInfo)
    
    
        if(newClass){
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

module.exports = router;