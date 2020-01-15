const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const classRouter = require("./routes/classRouter.js");
const port = 3000;
const app = express();

app.use(cors());
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json());
app.use("/class", classRouter);







app.listen(port,()=> {
    console.log(`Server is running on port: ${port}`);
});