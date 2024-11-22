require("dotenv").config();
const { FORCE } = require("sequelize/lib/index-hints");
const app = require("./app");
const db = require("./models");

let port = process.env.PORT;

db.sequelize
  .sync()
  .then(() => {
    console.log("database connected successfully");
  })
  .catch(() => {
    console.log("error while connecting database");
  });

app.listen(port, (err) => {
  if (err) {
    console.log(`--------error while starting server-----------`);
  }
  console.log(`--------server started successfully at port-------- ${port}`);
});
