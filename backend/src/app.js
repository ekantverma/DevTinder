const express  = require('express');
const app = express();
const port = process.env.PORT || 3000;

app.use("/hello", (req, res) => {
    res.send("Welcome to the Node.js Server");
})

app.use("/hi", (re, res) => {
    res.send("Hi there!");
})

app.use('/', (req, res) => {
    res.send("Dashboard")
})


app.listen(port , () => {
    console.log("Server is listening on port " + port);
})