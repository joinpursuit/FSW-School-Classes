const express = require("express");
const app = express()
const cors = require("cors")
const port = 3000
const School = require("./School")
const Class = require("./Class")
const Student = require("./Student")

app.use(cors());

let newSchool = new School()

// app.use(bodyParser.urlencoded({
//     extended: false
// }))

const classRouter = require("./Server/routes/class")

app.use("/class", classRouter)

app.use("*", (req, res) => {
    res.status(404).send('Error: no such route found on Sealab 2021 server. Try again.');
});

app.listen(port, () => {
    console.log(`Ahoy there! Ye be listen'in to http://localhost:${port}`)
})