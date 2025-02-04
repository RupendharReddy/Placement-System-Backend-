// auth.middleware.js
const jwt = require('jsonwebtoken');
const { secretKey } = require('./config/jwt.config');

const authenticate = async (req, res, next) => {
  const accessToken = req.cookies.accessToken;

  if (!accessToken) {
    return res.status(401).json({ message: 'Access token is missing' });
  }

  try {
    const decoded = jwt.verify(accessToken, secretKey);
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(401).json({ message: 'Invalid access token' });
  }
};

module.exports = authenticate;