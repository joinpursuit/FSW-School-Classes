let express = require('express')
const bodyParser = require('body-parser')
let cors = require('cors')
let app = express()
let port = 4000;

app.use(cors())

app.use(express.urlencoded({
    extended: true
}))

// app.use(express.json)




app.listen(port,() =>{
    console.log(`Server is listening at http:localhost:${port}`)
})