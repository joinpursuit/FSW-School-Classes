var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");

var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");

var app = express();

app.use(express.static(path.join(__dirname, "../client")));

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

const classRouter = require("./routes/classRouter");
app.use("/class", classRouter);

app.use("/", indexRouter);
app.use("/users", usersRouter);

// app.use("/", (req, res, next) => {
//   res.sendFile(path.resolve(__dirname, "../client/frontEnd.html"));
// });

module.exports = app;
