const express = require("express");
const cors = require("cors");

const port = 3000;

const app = express();
app.use(cors());

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

let myschool = new School();


app.listen(port, () => {
    console.log("listening on port: ", port)
});



