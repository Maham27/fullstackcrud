const { Sequelize, DataTypes } = require('sequelize');

const { sequelize } = require('../config/db')
const Subject = sequelize.define("Subject", {
  name: {
    type: DataTypes.STRING,
    allowNull: false
  }
},
);
module.exports = Subject;