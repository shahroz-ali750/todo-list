const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  if (!(req.headers.authorization || req.headers.Authorization)) {
    return res.status(401).json("please provide token to proceed");
  }

  let tokenString = req.headers.authorization || req.headers.Authorization;

  let token = tokenString.split(" ")[1];

  jwt.verify(token, process.env.JWT_SECRET_KEY, (err, decode) => {
    if (err) {
      return res.status(401).json(err.message);
    }

    // res.status(200).json(decode)

    req.userId = decode.id;

    next();
  });
};
