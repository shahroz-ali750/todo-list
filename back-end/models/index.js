const sequelize = require("../database");

const db = {};

db.sequelize = sequelize;

db.todos = require("./todo.model")(sequelize);

module.exports = db;
