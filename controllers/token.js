// token.js
const jwt = require('jsonwebtoken');
const { accessTokenSecret, refreshTokenSecret, accessTokenExpiration, refreshTokenExpiration } = require('../config/jwt.config');

const generateAccessToken = (user) => {
  const payload = {
    userId: user.rollnumber,
    email: user.gmail,
  };
  return jwt.sign(payload, accessTokenSecret, { expiresIn: accessTokenExpiration });
};

const generateRefreshToken = (user) => {
  const payload = {
    userId: user.rollnumber,
    email: user.gmail,
  };
  return jwt.sign(payload, refreshTokenSecret, { expiresIn: refreshTokenExpiration });
};

module.exports = { generateAccessToken, generateRefreshToken };