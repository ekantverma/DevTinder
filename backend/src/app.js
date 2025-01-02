const express  = require('express');
const app = express();
const port = process.env.PORT || 3000;

app.get("/user", (req, res) => {
    res.send("Data sucessfully fetched!");
})

app.post("/user", (req, res) => {
    res.send("Data succesfully saved to database!");
})

app.delete("/user", (req, res) =>{
    res.send("Data succesfully deleted from database!");
})

app.use('/', (req, res) => {
    res.send("Dashboard")
})


app.listen(port , () => {
    console.log("Server is listening on port " + port);
})