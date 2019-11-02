/*
Joseph P. Pasaoa
school Route | Express Server Project
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


/* ROUTES */
// unpublished route for debugging purposes
router.get("/", (req, res) => {
    res.json({
        status: "SUCCESS",
        joeySchool: g
    });
});


module.exports = router;
