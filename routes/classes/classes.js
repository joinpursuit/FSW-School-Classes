
const classes = require('express').Router()

// let classArr = []
classes.get('/',(req,res ) => {
    res.json(this.classes)
})
classes.post('/',(req,res) => {
    this.classes["name"].push(req.body)
        res.json({
            status: 200,
            message: "class added!",
            addedClass: req.body
        })
    
})


module.exports = classes