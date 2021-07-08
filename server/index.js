const express = require("express");
const app = express();
const mongoose = require("mongoose");
const config = require("./config/key");
const cookieParser = require("cookie-parser");

app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.json());

mongoose
  .connect(config.mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
  })
  .then(() => console.log("MongoDB Connected..."))
  .catch((err) => console.log("Not Working"));

app.use("/api/users", require("../server/routes/user"));
app.use("/api/favorite", require("../server/routes/favorite"));

const port = process.env.PORT || 3330;

app.listen(port, () => console.log(`${port} port is working`));
