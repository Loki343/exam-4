var jwt = require("jsonwebtoken");

const auth = (req, res, next) => {
  const token = req.headers.authorization;
  if (token) {
    jwt.verify(token, "toverify", (err, decoded) => {
      if (decoded) {
        req.body.userID = decoded.userID;
        next();
      } else {
        res.status(400).send({ msg: "Please login first" });
      }
    });
  } else {
    res.status(400).send({ msg: "Please login first" });
  }
};

module.exports = { auth };
