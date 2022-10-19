const router = require("express").Router();

const userRoutes = require("./user-routes.js");
router.use("/users", userRoutes);

const homepageRoutes = require("./homepage-route");
router.use("/home", homepageRoutes);

const dashboardRoutes = require("./dashboard-routes");
router.use("/dashboard", dashboardRoutes);

const movieRoutes = require("./movie-routes");
router.use("/movies", movieRoutes);

const showRoutes = require("./show-routes");
router.use("/shows", showRoutes);

module.exports = router;
