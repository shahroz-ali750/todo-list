const express = require("express");
const cors = require("cors");
const todoRoutes = require("./routes/todo.route");
const todoUserRoutes = require('./routes/todoUser.route')
const authenticationMW = require('./middleware/authen.middleware')
const app = express();

app.use(express.json());
app.use(cors());

// const corsOptions = {
//   origin: "http://localhost:3000/",
//   optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
// };
app.use('/api/v1/user',todoUserRoutes)

// token required
// app.use(authenticationMW)
app.use("/api/v1/todo", todoRoutes);

module.exports = app;
