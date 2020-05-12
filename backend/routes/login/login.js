const login = require("express").Router();
const {getUser, createUser, getPerson} = require("./../../queries/login/login.js");

login.get("/", getUser);

login.post("/", createUser);

login.get("/:userType/:id/:firstName/:lastName", getPerson);

module.exports = login;