const express = require("express");
const { userRouter } = require("./routes/user.routes");
const { connection } = require("./config/db");
require("dotenv").config();
const { auth } = require("./middlewares/auth");
const cors = require("cors");

const app = express();

app.use(express.json());

app.use(cors());
app.use("/users", userRouter);
app.use(auth);

app.get("/", (req, res) => {
  res.send("Full-stack-app");
});

app.listen(process.env.PORT, async () => {
  try {
    await connection;
    console.log("Connected to MongoDB");
  } catch (err) {
    console.log(err);
  }
  console.log(`Server is running on port ${process.env.PORT}`);
});
