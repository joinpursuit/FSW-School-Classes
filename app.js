const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser")

port = 5000;
const app = express();

// let mySchool = new mySchool();

app.listen(port, () => {
    console.log("App is listening on port ", port)
})