const { Sequelize } = require("sequelize");

const sequelize = new Sequelize("education", "root", "", {
  host: "localhost",
  dialect: "mysql"
});

async function connectDB() {
  try {
    await sequelize.authenticate();
    console.log("Database Connected Successfully");
  } catch (error) {
    console.error("Database connection failed:", error);
  }
}

module.exports = { sequelize, connectDB };
