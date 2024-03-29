const express = require("express");
const routes = require("./controllers");
require("dotenv").config();
const PORT = process.env.PORT || 3001;
const path = require("path");
const sequelize = require("./config/connection");
const app = express();
const cors = require("cors");
const corsOptions = {
  origin: [
    "http://localhost:3000",
    "https://agile-springs-04238.herokuapp.com/",
    "https://naimdb.herokuapp.com/",
  ],
  credentials: true, //access-control-allow-credentials:true
  optionSuccessStatus: 200,
};
app.use(cors(corsOptions));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/api", routes);

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../client/build")));
}

app.use("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../client/build/index.html"));
});

sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => console.log(`Now Listening on ${PORT}`));
});
