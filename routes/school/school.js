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

<<<<<<< HEAD
module.exports = School;
=======
module.exports = school;

//this is a commit test
>>>>>>> 7e5c45b445c454d2b27bd128af210b03d0ba1bbf
