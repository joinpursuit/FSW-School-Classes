const express = require("express");
const cors = require("cors");
const app = express();
const bodyParser = require("body-parser");
const School = require("./School")
const port = 3000;

let mySchool = new School();
// let approvedMessage = {message: "Created a new class", timestamp: "Todays Date"}



app.use(cors());

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.post('/class/:name/:teacher', (req, res) => {
    let keys = Object.keys(mySchool.classes)

    if(keys.includes(req.params.name)){
            res.send({error: "Please fill out all the information or Class already exists",
            timestamp: "YYYY, MM/DD HH:MM:SS"})
        }else {
            mySchool.classes[mySchool.addClass(req.params.name, req.params.teacher)]
            mySchool.classes[req.params.name]["message"] = "Created a new class"
            mySchool.classes[req.params.name]["timestamp"] = "Todays Date"
            res.send(mySchool.classes) 
        }
})
app.post('/', (req, res) => {

})
app.get('/', (req,res) => {
    news
})


app.listen(port, () => {
    console.log("Listening to port: " + port)
})

