const express = require("express");

const app = express(); 

const cors = require("cors");

const bodyParser = require("body-parser")

const port = 4000; 

const classRouter = require('./routes/classRouter.js')
app.use('/class', classRouter);

app.use(cors())

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
    extended: false
}))

app.listen(port, () => {
    console.log(`Listening on port ${port}!`)
})