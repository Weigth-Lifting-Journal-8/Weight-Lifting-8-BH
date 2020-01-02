const jwt = require("jsonwebtoken"); 

// USED TO AUTHENTICATE USER TO ACCESS LIFTING INFORMATION

module.exports = (req, res, next) => {
    const token = req.headers.authorization;


    if (token) {
      const secret = process.env.JWT_SECRET || "This is a secret";
      jwt.verify(token, secret, function(err, decodedToken) {
        if (err) {
          res.status(401).json({ message: 'Invalid token.' });
        } else {
          req.decodedJwt = decodedToken;
          next();
        }
      });
    } else {
      res.status(401).json({ message: 'Please login and try again.' });
    }
  };