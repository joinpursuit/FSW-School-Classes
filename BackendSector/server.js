const express = require("express")
const cors = require("cors")
const bodyParser = require("body-parser")

const classRouter = require("./routes/classRoutes.js")

const port = 4000

const app = express()
app.use(cors())
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())

app.use("/class", classRouter)

app.listen(port, () => {
    console.log(`Server is runnning on ${port}`)
})