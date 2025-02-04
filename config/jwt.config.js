// jwt.config.js
require('dotenv').config();

const accessTokenSecret = process.env.ACCESS_TOKEN_SECRET;
const refreshTokenSecret = process.env.REFRESH_TOKEN_SECRET;
const accessTokenExpiration = '1h'; // 1 hour
const refreshTokenExpiration = '30d'; // 30 days

module.exports = {
  accessTokenSecret,
  refreshTokenSecret,
  accessTokenExpiration,
  refreshTokenExpiration,
};