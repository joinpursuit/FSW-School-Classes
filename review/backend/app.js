const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const PORT = 3002;
const app = express();
                                                                                                                                                                                                         
const carsRouter = require("./carRoutes/cars.js")

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json());

app.use("/cars", carsRouter);


app.listen(PORT, () => console.log("Listening on " + PORT));