const teachersClassRouter = require("express").Router({mergeParams: true});
const {getClasses} = require("./../../../queries/teachers/classes/classes");

teachersClassRouter.get("/", getClasses);

module.exports = teachersClassRouter;