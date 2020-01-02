const express = require("express");
const router = express.Router();

router.use(express.urlencoded({extended:false}));

router.get("/:classId/students", (req, res) => {
    res.send("here's all those students you wanted")
})

router.post('/', (req, res) => {
    res.send("Here's ALL of the classes!")
});

router.post('/:classId/enroll', (req, res) => {
    res.send(`You have enrolled the class: ${classId}`)
});

module.exports = router