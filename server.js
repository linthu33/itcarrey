const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const path = require("path");
require("dotenv").config();
const app = express();
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, "/public")));

const PORT = process.env.PORT || 4040;

app.get("/", (req, res) => {
  res.json({
    message: "test for developer.",
  });
});

app.listen(PORT, () => {
  console.log("Server is listening on port ", PORT);
});
