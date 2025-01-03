const express = require("express");
const app = express();
const port = process.env.PORT || 3000;
const {isAuth, userAuth} = require("./middlewares/auth");

// Middleware when we request any admin api the middleware will be called for all the routes get patch put requests.
app.use("/admin", isAuth);
app.use("/user", userAuth);

app.get("/user", userAuth, (req, res) => {
  res.send("User data sended!")
})

app.get("/admin/getData", (req, res) => {
  res.send("Data send to admin!")
})

app.get("/admin/deleteData", (req, res) => {
  res.send("Data deleted!")
})

app.listen(port, () => {
  console.log("Server is listening on port " + port);
});






