const router = require("express").Router();
const { User, Movie, List } = require("../../models");

router.get("/", async (req, res) => {
  try {
    const userData = await User.findAll({
      attributes: { exclude: ["password"] },
    });
    res.json(userData);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
});

router.post("/", async (req, res) => {
  try {
    const userData = await User.create({
      username: req.body.username,
      email: req.body.email,
      password: req.body.password,
    });
    res.json(userData);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
});

module.exports = router;
