
const classes = require('express').Router()
// const purusit = require('./School');
// const Class = require('./Class');
// const Student = require('./Student')


// let classArr = []
classes.get('/',(req,res ) => {
    res.json(req.body)
})
classes.post('/',(req,res) => {
    addClass["name"].push(req.body)
        res.json({
            status: 200,
            message: "class added!",
            addedClass: req.body
        })
    
})


module.exports = classes