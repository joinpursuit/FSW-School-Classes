const express = require("express");
const router = express.Router();
const bodyParser = require("body-parser")

router.get("/:classId/students", (req, res) => {
    res.send("here's all those students you wanted")
})

router.post('/', (req, res) => {
    res.send("Here's ALL of the classes!")
});

router.post('/:classId/enroll', (req, res) => {
    res.send(`You have enrolled the class: ${classId}`)
});

router.use(bodyParser.urlencoded({
    extended: false
}))

module.exports = router