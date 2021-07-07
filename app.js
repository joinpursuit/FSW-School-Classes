const express = require("express");
const cors = require("cors");
const classRouter = require("./routes/class/class.js");
const port = 3000;
const app = express();
app.use(cors());

app.use("/class", classRouter);

app.listen(port, () => console.log("Listening on port: ", port));
