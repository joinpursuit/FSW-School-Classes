const express = require('express')
const app = express()
const port = 8000

app.use(express.urlencoded({
    extended: true
}))

app.post('/class', (req, res)=> {
    
})

app.listen(port, () => {
    console.log(`Server is listening at http://localhost:${port}`)
})

