const login = require("express").Router();
const {getUser, createUser} = require("./../../queries/login/login.js");

login.get("/", getUser);

login.post("/", createUser);

module.exports = login;