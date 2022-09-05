const { readdirSync } = require("fs");
const mongoose = require("mongoose");
const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());

const userRoute = require("./routes/user");

// dynamically requiring all the routes from routes folder and using them
readdirSync("./routes").map((r) => app.use("/", require("./routes/" + r)));

// database
mongoose
  .connect(process.env.DATABASE_URL, {
    useNewUrlParser: true,
  })
  .then(() => console.log("dataBase connected succesfully"))
  .catch((err) => console.log("error connecting to mongodb", err));
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`sever is running... on port ${PORT}`);
});
