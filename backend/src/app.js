const express = require("express");
const app = express();
const port = process.env.PORT || 3000;

// app.use(
//   "/",
//   [(req, res, next) => {
//     next();
//     res.send("1st Handler");
//   },
//   (req, res, next) => {
//     res.send("2nd Handler");
//     next();
//   }],
//   (req, res, next) => {
//     next();
//     res.send("3rd Handler");
//   },
//   (req, res, next) => {
//     res.send("4th Handler");
//     next();
//   }
// );

const hr1 = (req, res, next) => {
    next();
    res.send("1st handler")
}
const hr2 = (req, res, next) => {
    res.send("2nd handler")
    next();
}
const hr3 = (req, res, next) => {
    next();
    res.send("3rd handler")
}

app.use("/user", [hr1, hr2], hr3);

app.listen(port, () => {
  console.log("Server is listening on port " + port);
});
