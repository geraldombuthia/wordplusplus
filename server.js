const express = require("express");
const mongoose = require("mongoose");
const app = express();
const wordRouter = require("./routes/words");
const Word = require("./models/word");
const cors = require("cors");
let port = process.env.PORT || 3000


app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(cors());
app.use("/words", wordRouter);
require("dotenv").config();

mongoose.connect(process.env.CONNECTMONGO, { useNewUrlParser: true, useUnifiedTopology: true, autoIndex: true }, () => {
    console.log("Connected to db");
})

app.get("/", (req, res) => {
    res.json("Welcome to word++")
})
app.listen(port, () => {
    console.log("Listening...." + port)
})