const express = require("express")
const cors = require("cors")
const bodyParser = require("body-parser")
const app = express()
const port = 3000;
const queryRouter = require("./routes/query.js")
const inputRouter = require("./routes/input.js")

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(cors());
app.use(express())


app.use("/input", inputRouter)
app.use("/query", queryRouter)





app.listen(port,()=>{
    console.log("youre runnin on port", port)
})



