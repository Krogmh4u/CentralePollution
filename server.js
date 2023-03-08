const express = require("express");
const cors = require("cors");

const app = express();

var corsOptions = {
  origin: "http://localhost:8081"
};

app.use(cors(corsOptions));

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

const db = require("./app/models");
db.sequelize.sync({ force: true } /* drop db : development */)
  .then(() => {
    console.log("Base de donnée synchonisée..");
  })
  .catch((err) => {
    console.log("Impossible de synchoniser la base de donnée : " + err.message);
});

/*
app.get("/", (req, res) => {
  res.json({ message: "Reponse du serveur." });
});
*/

require("./app/routes/entries.routes")(app);

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
