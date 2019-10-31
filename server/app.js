/*
Joseph P. Pasaoa
Server | Express Server Project
*/


/* HELPERS */
const log = console.log;


/* MODULES INIT */
const express = require('express');
  const app = express();
  const port = 11000;
const cors = require('cors');
  app.use(cors());
// database
const g = require("../database/database.js");


/* SERVER INIT */
app.listen(port, () => {
    log(`JoeyServer is listening on port ${port}. Carpe diem.`);
});


/* MAIN ROUTING */
// Imports
const schoolRT = require('./routes/schoolRT.js');
const classRT = require('./routes/classRT.js');
// Connects
app.use('/school', schoolRT);
app.use('/class', classRT);


/* NO-ROUTE CATCH */
app.use("*", (req, res) => {
    res.status(404).send('error: no such route found on this JoeyServer');
});
