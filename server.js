const express = require("express");
const app = express();
const port = 3000;
const cors = require("cors");
const bodyParser = require("body-parser");
const School = require("./School.js");
const Class = require('./Class');
const Student = require('./Student')





app.use(cors());
app.use(bodyParser.urlencoded({
    extended: false
}))

app.use(bodyParser())

const classRouter = require("./routes/classRoutes.js");
app.use("/class", classRouter);


app.listen(port, () => {
    console.log(`server is running at port ${port}`);
})

