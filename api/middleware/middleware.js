const jwt = require('jsonwebtoken');
const { jwtSecret } = require('../../config/secrets');

module.exports = {
  isValid,
  newToken
};

function isValid(user) {
  return Boolean(user.username && user.password && typeof user.password === "string");
}

function newToken() {

}