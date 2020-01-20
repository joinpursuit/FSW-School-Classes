const school = require('express').Router()
//const Schools = require('school')

school.get('/',(req,res)=> {
    res.json({
        message: 'schoolR is working'
    })
})

school.post('/add',(req,res) => {
    addClass(req.body)
    res.json(pursuit)
    
})

module.exports = School;