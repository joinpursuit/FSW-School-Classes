const express = require("express")
const cors = require("cors")
const bodyParser = require("body-parser")

//Require Router Routes
const classRouter = require("./routes/classRoutes.js")


//VS Code - Command + T for looking at file paths

//Set-Up Port
const port = 3000

//Invoke Express Module and Middleware Modules
const app = express()
app.use(cors())
app.use(bodyParser.urlencoded({extended: false})) //Parses data from a POST request submitted via a form.
app.use(bodyParser.json()) //Parses POST request data into a json objet
//req.body: A new body object containing the parsed data is populated on the request object after the middleware.

app.use("/users", userRouter) //setting basepoint for all routes using user through Router middleware //Telling App to use Users Router middleware based on passed endpoint
//When creating routes, test route functionality
app.use("/pets", petRouter) //Telling App to use Pets Router middleware based on passed endpoint



app.listen(port, () => {
    console.log(`Server is runnning on ${port}`)
})