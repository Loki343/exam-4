const express = require("express");
const userRouter = express.Router();
const { UserModel } = require("../model/user.model");
var jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

//for register
userRouter.post("/register", async (req, res) => {
  const { name, email, gender, password } = req.body;
  try {
    bcrypt.hash(password, 2, async (err, hash) => {
      const user = new UserModel({
        name,
        email,
        gender,
        password: hash,
      });
      await user.save();
      res.status(200).send({ msg: "Registration has been done!!" });
    });
  } catch (err) {
    res.status(400).send({ msg: err.message });
  }
});

//for login
userRouter.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await UserModel.find({ email });
    if (user) {
      bcrypt.compare(password, user[0].password, (err, result) => {
        if (result) {
          res.status(200).send({
            msg: "Login successfull!",
            token: jwt.sign({ userID: user[0]._id }, "toverify"),
          });
        } else {
          res.status(400).send({ msg: "Login Failed! Wrong Credentials!" });
        }
      });
    } else {
      res.status(400).send({ msg: "Error" });
    }
  } catch (error) {
    res.status(400).send({ msg: error.message });
  }
});

module.exports = { userRouter };
