const classesRouter = require("express").Router();
const School = require("./../School.js");


classesRouter.get("/", (req, res) => {
    res.json("this works")
})















module.exports = classesRouter;