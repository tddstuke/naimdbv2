const router = require("express").Router();

const apiRoutes = require("/");
router.use("/", apiRoutes);

router.use((req, res) => {
  res.status(404).end();
});

module.exports = router;
