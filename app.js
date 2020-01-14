const express = require("express")
const cors = require("cors")
const app = express()
const bodyParser = require("body-parser")
const port = 3001

app.use(cors())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())



// let mySchool = new School();

















app.listen(port, () => {
    console.log("Listening on port " + port)
})