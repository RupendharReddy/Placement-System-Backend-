const { Sequelize } = require("sequelize");
const config = require("./config/config.json")["development"];

const sequelize = new Sequelize(config.database, config.username, config.password, {
  host: config.host,
  dialect: config.dialect,
  logging: false, // Disable logging in production
});

sequelize.authenticate()
  .then(() => console.log("Connected to MySQL database using Sequelize"))
  .catch(err => console.error("Database connection failed:", err));

module.exports = sequelize;
