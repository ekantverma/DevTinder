const express = require("express");
const app = express();
const connectDB = require("./config/database");
const port = process.env.PORT || 3000;
const cookies = require("cookie-parser");
const authRouter = require("./routes/auth");
const profileRouter = require("./routes/profile");
const requestRouter = require("./routes/request");
const userRouter = require("./routes/user");
const cors = require("cors");
const http = require("http");
const initializeSocket = require("./utils/socket");

require('dotenv').config();

app.use(cors({
  origin: ["http://localhost:5173"],
  credentials: true
}));

app.use(express.json());
app.use(cookies());

app.use("/", authRouter);
app.use("/", profileRouter);
app.use("/", requestRouter);
app.use("/", userRouter);

const server = http.createServer(app);
initializeSocket(server);

connectDB()
  .then(() => {
    console.log("Database Connected successfully!");
    server.listen(port, () => {
      console.log("Server listening on port " + port);
    });
  })
  .catch((err) => console.log("Database Connection Failed!", err));
