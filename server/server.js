const express = require("express");
const routes = require("./controllers");
// const helpers = require("./utils/helper.js");
require("dotenv").config();
const PORT = process.env.PORT || 3001;
const path = require("path");
const sequelize = require("./config/connection");
const app = express();
const cors = require("cors");
var corsOptions = {
  origin: "http://localhost:3001",
};

app.use(cors(corsOptions));

// const session = require("express-session");

// const SequelizeStore = require("connect-session-sequelize")(session.Store);

// const sess = {
//   secret: process.env.SESSION_SECRET,
//   cookie: {},
//   resave: false,
//   saveUninitialized: true,
//   store: new SequelizeStore({
//     db: sequelize,
//   }),
// };

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// app.use(express.static(path.join(__dirname, "public")));
// app.use(session(sess));

app.use(routes);

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../client/dist")));
}

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../client/dist/index.html"));
});

sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => console.log(`Now Listening on ${PORT}`));
});
