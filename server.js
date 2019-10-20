const express = require("express");
const app = express()
const bodyParser = require("body-parser")
const cors = require("cors")
const port = 3000

app.use(cors());

app.use(bodyParser.urlencoded({
    extended: false
}))

const recipesRouter = require("./routes/recipes")
const usersRouter = require("./routes/users")

app.use("/recipes", recipesRouter)
app.use("/users", usersRouter)

app.listen(port, () => {
    console.log(`Ahoy there! Ye be listen'in to http://localhost:${port}`)
})