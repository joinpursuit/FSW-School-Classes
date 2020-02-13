const express = require("express")
const cors = require("cors")
const app = express()
const port = 7000
const bodyParser = require("body-parser")
const {getAllClass, addNewClass} = require("./backend/middleware/school")


app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json())
app.use(cors())



app.get('/class', getAllClass);
app.post('/class',addNewClass);









app.listen(port,()=>{
    console.log("listening to port", port)

})