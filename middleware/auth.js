const jwt = require("jsonwebtoken");
const config = require("../config.json");

module.exports = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    if (req.session.user && req.session.token && req.session.token === token) {
      const decodedToken = jwt.verify(token, config.jwtSecret);
      const tokenStatus = decodedToken.isActive;
      if (tokenStatus) {
        next();
      } else {
        throw "Invalid token";
      }
    } else if (!req.session.token) {
      const decodedToken = jwt.verify(token, config.jwtSecret);
      const tokenStatus = decodedToken.isActive;
      if (tokenStatus) {
        next();
      } else {
        throw "Invalid token";
      }
    } else {
      throw "Invalid token";
    }
  } catch {
    res.status(401).send({
      error: "Authorization Failed. Invalid Token",
    });
  }
};
