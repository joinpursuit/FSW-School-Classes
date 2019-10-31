/*
Joseph P. Pasaoa
class Route | Express Server Project
*/


/* HELPERS */
const log = console.log;


/* DATABASE ACCESS */
const g = require("../../database/database.js");


/* ROUTER INIT */
const express = require('express');
  const router = express.Router();
  router.use(express.json()); // for Raw and Postman
  router.use(express.urlencoded({extended: false}));


/* HELPERS */


/* MIDDLEWARE */
const checkExists = (req, res, next) => {
  
};

/* ROUTES */

router.post("/", checkExists);


module.exports = router;
