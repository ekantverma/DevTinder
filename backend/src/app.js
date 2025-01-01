const express  = require('express');
const app = express();
const port = process.env.PORT || 3000;

app.get('/', (req, res) => {
    console.log("Hello devs");
})

app.listen(port , () => {
    console.log("Server is listening on port " + port);
})