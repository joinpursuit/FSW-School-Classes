const classes = require("express").Router();
const {addClass, getClasses} = require("./../../queries/classes/classes");
const classStudentsRouter = require("./students/students");

classes.use("/:classId/students", classStudentsRouter);

classes.post("/", addClass);

classes.get("/", getClasses);

module.exports = classes;