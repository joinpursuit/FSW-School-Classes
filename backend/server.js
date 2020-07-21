const express = require('express');
const app = express();
const port = 3030; 
const cors = require('cors');

//app level middleware
app.use(cors());
app.use(express.urlencoded({
    extended: true
}))
app.use(express.json())

const classRouter = require('./classRouter.js')
app.use('/class', classRouter)


app.listen(port, ()=>{
    console.log(`Listening on http://localhost:${port}`)
})