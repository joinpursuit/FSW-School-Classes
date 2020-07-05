const express = require("express");
const cors = require("cors");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");

const indexRouter = require("./routes/index");
const usersRouter = require("./routes/users");

const app = express();
app.use(express.json());
app.use(cors());

app.use(express.static(path.join(__dirname, "../client")));

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

const classRouter = require("./routes/classRouter");
app.use("/class", classRouter);

// app.use("/", indexRouter);
// app.use("/users", usersRouter);

// app.use("/", (req, res, next) => {
//   res.sendFile(path.resolve(__dirname, "../client/frontEnd.html"));
// });

module.exports = app;
