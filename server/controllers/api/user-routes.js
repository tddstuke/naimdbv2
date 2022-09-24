const router = require("express").Router();
const { User, Movie, List } = require("../../models");
const jwt = require("jsonwebtoken");
const config = require("../../config/auth.config");

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

router.post("/login", (req, res) => {
  User.findOne({
    where: {
      email: req.body.email,
    },
  })
    .then((dbUserData) => {
      if (!dbUserData) {
        res.status(400).json({ message: "No user with that email address!" });
        return;
      }

      const validPassword = dbUserData.checkPassword(req.body.password);

      if (!validPassword) {
        res.status(400).json({ message: "Incorrect password!" });
        return;
      }

      var token = jwt.sign({ id: dbUserData.id }, config.secret, {
        expiresIn: 86400,
      });

      //   res.status(200).send({
      //     id: dbUserData.id,
      //     username: dbUserData.username,
      //     email: dbUserData.email,
      //     accessToken: token,
      //   });
      res.json({
        user: dbUserData,
        token,
        message: "You are now logged in!",
      });
    })
    .catch((err) => {
      res.status(500).send({ message: err.message });
    });
});

router.post("/logout", (req, res) => {
  if (req.session.loggedIn) {
    req.session.destroy(() => {
      res.status(204).end();
    });
  } else {
    res.status(404).end();
  }
});

router.put("/:id", (req, res) => {
  User.update(req.body, {
    individualHooks: true,
    where: {
      id: req.params.id,
    },
  })
    .then((dbUserData) => {
      if (!dbUserData) {
        res.status(404).json({ message: "No user found with this id" });
        return;
      }
      res.json(dbUserData);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.delete("/:id", async (req, res) => {
  try {
    const userData = await User.destroy({
      where: {
        id: req.params.id,
      },
    });
    if (!userData) {
      res.status(404).json({ message: "No user found with this id" });
      return;
    }
    res.json(userData);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
});

module.exports = router;
