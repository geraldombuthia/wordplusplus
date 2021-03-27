const express = require("express");
const mongoose = require("mongoose");
const app = express();
const wordRouter = require("./routes/words")


app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use("/words", wordRouter);

mongoose.connect("mongodb://localhost/wordplus", { useNewUrlParser: true, useUnifiedTopology: true }, () => {
    console.log("Connected to db");
})

app.listen(3000, () => {
    console.log("Listening....")
})