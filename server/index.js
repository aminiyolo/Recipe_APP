const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();

const userRoute = require("./routes/user");
const favoriteRoute = require("./routes/favorite");
const chatRoute = require("./routes/chat");
const mailRoute = require("./routes/authMail");

const cookieParser = require("cookie-parser");

app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.json());

mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
  })
  .then(() => console.log("MongoDB Connected..."))
  .catch((err) => console.log("Not Working"));

app.use("/api/users", userRoute);
app.use("/api/favorite", favoriteRoute);
app.use("/api/chat", chatRoute);
app.use("/api/auth", mailRoute);

app.listen(process.env.PORT || 3330, () => console.log(`port is working`));
