const express = require("express")
const app = express()
const {
  getAllPets,
  addPetToShelter
} = require("./middleware/shelterMiddleware")
//cors, body-parser, port = 3000 and listen to port at end
//install express cors bodyparser axios

// const Shelter = require("./models/shelter")

// let newShelter = new Shelter()

app.use(cors())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.get("/pets", getAllPets)

app.post("/pets", addPetToShelter)

app.use((err, req, res, next) => {
  res.status(err.status).json(err)
})
