const express = require("express");
const app = express();
const connectDB = require("./config/database");
const port = process.env.PORT || 3000;

connectDB()
.then(() => {
    console.log("Database Connected successfully!");
    app.listen(port, () => {
      console.log("Server listening on port " + port)
    })
})
.catch(err => console.log("Database ConnectFailed!"));





