const express = require("express");
const cors = require("cors");
const app = express();
const options = {
  origin: "http://localhost:3000",
  useSuccessStatus: 200,
};
app.use(cors());

app.get("/", (req, res) => {
  res.end("<h1>Hello World</h1>");
});

app.listen(8000, () => {
  console.log("sever is running...");
});
