const express = require("express");
const mongoose = require("mongoose");
const app = express();
const wordRouter = require("./routes/words")
const cors = require("cors");


app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(cors());
app.use("/words", wordRouter);
require("dotenv").config();

mongoose.connect(process.env.CONNECTMONGO, { useNewUrlParser: true, useUnifiedTopology: true }, () => {
    console.log("Connected to db");
})

app.listen(3000, () => {
    console.log("Listening....")
})