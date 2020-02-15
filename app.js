const express = require("express")
const cors = require("cors")
const app = express()
const bodyParser = require("body-parser")
// const port = 3001
const School = require("./School.js")
const Student = require("./Student.js")
const classesRouter = require("./routes/classesRouter.js")

app.use(cors())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use("/class", classesRouter)

app.listen(port, () => {
  console.log("Listening on port " + port)
})

