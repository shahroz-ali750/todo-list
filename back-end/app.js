const express = require("express");
const cors = require("cors");
const todoRoutes = require("./routes/todo.route");
const todoUserRoutes = require('./routes/todoUser.route')
const authenticationMW = require('./middleware/authen.middleware')
const app = express();

app.use(express.json());
app.use(cors());

app.use('/api/v1/user',todoUserRoutes)

// token required
app.use(authenticationMW)
app.use("/api/v1/todo", todoRoutes);

module.exports = app;
