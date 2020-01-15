const express = require("express");
const cors = require("cors");
const app = express();
const bodyParser = require("body-parser");
const port = 3000;

let mySchool = new School();

app.use(cors());

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());



app.listen(port, () => {
    console.log("Listening to port: " + port)
})

