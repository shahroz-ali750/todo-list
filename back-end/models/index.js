const sequelize = require("../database");

const db = {};

db.sequelize = sequelize;

db.users = require('./todoUser.model')(sequelize)
db.todos = require("./todo.model")(sequelize);

db.users.hasMany(db.todos, {foreignKey:"userId"})
db.todos.belongsTo(db.users, {foreignKey:"userId"})

module.exports = db;
