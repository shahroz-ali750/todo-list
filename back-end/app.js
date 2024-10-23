const express = require('express')
const app = express()
 const todoRoutes = require('./routes/todo.route')





app.use('/api/v1/todo',todoRoutes)







module.exports = app



