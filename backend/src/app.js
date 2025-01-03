const express = require("express");
const app = express();
const port = process.env.PORT || 3000;

// Middleware when we request any admin api the middleware will be called for all the routes get patch put requests.
app.use("/admin", (req, res, next) => {
  console.log("User is authenticated")
  const admin = "xyz";
  const isAuth = admin === "xyz";
  if(!isAuth){
    res.status(401).send("User is not authorized");
  } else {
    next();
  }
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






