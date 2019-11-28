const path = require("path");
const express = require("express");
const cors = require("cors");
const app = express();

app.use(express.static(path.join(__dirname, "../client")));

app.use(cors());

let port = process.env.PORT;
if (port == null || port == "") {
  //change port back
  port = 3100;
}

app.use(
  express.urlencoded({
    extended: false
  })
);
app.use(express.json());

const classRouter = require("./routes/classRouter");
app.use("/class", classRouter);

app.use("/", (req, res, next) => {
  res.sendFile(path.resolve(__dirname, "../client/frontEnd.html"));
});

app.listen(port, () => {
  console.log(`Running at http://localhost:${port}/`);
});
