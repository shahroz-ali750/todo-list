const sequelize = require('../database')
 

const db = {}

db.sequelize = sequelize

db.todo  = require('./todo.model')(sequelize)




module.exports = db