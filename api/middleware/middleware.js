const jwt = require('jsonwebtoken');

const { jwtSecret } = require('../../config/secrets');

function isValid(user) {
  return Boolean(user.username && user.password && typeof user.password === "string");
}

function newToken(user) {
  const payload = {
    subject: user.id,
    username: user.username,
    department: user.department
  };
  const options = {
    expiresIn: '1d',
  };
  return jwt.sign(payload,jwtSecret,options);
}

const loggedIn = (req, res, next) => {
  const token = req.headers.authorization;
  console.log('token',token);
  console.log('header',req.headers);
  
  if(token) {
    jwt.verify(token, jwtSecret, (err, decoded) => {
      if (err) {
        res.status(401).json('You shall not pass!');
      } else {
        req.decodedToken = decoded;
        next();
      }
    });
  } else {
    res.status(401).json('You shall not pass!');
  }
};

module.exports = {
  isValid,
  newToken,
  loggedIn
};
