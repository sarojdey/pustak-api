const express = require("express");
const books = require("./routes/books.js");
const app = express();
const PORT = 3000;

app.use("/api", books);

const db = require("./models");

db.sequelize.sync().then((req) => {
  app.listen(PORT, () => {
    console.log(`listining on port:${PORT}`);
  });
});
