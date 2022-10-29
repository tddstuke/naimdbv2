const router = require("express").Router();
const sequelize = require("../../config/connection");
const { Movie } = require("../../models");

router.get("/", async (req, res) => {
  try {
    const data = await Movie.findAll({
      attributes: [
        "id",
        "movie_id",
        // "title",
        "user_id",
        "overview",
        "poster_path",
        "tag",
      ],
    });
    res.json(data);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.get("/:id", async (req, res) => {
  try {
    const data = await Movie.findOne({
      where: {
        movie_id: req.params.id,
        user_id: req.body.id,
      },
      attributes: ["id", "movie_id"],
      //   include: {model: USER, attributes: ["username"]},}
    });
    if (!data) {
      res.status(404).json({ message: "No post found with this id" });
      return;
    }
    res.json(data);
  } catch (err) {
    console.log(err);
    res.status(404).json(err);
  }
});

router.put("/:movie_id", async (req, res) => {
  try {
    const data = await Movie.update(
      {
        tag: req.body.tag,
      },
      {
        where: {
          movie_id: req.params.movie_id,
          user_id: req.session.user_id,
        },
      }
    );
    if (!data) {
      res.status(404).json({ message: "No post found with this id" });
      return;
    }
    res.json(data);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.post("/", async (req, res) => {
  try {
    const data = await Movie.create({
      // list_id: req.body.list_id,
      // overview: req.body.overview,
      // poster_path: req.body.poster_path,
      // title: req.body.title,
      movie_id: req.body.movie_id,
      user_id: req.body.user_id,
    });

    res.json(data);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.delete("/:id/:userId", async (req, res) => {
  try {
    const data = await Movie.destroy({
      where: {
        movie_id: req.params.id,
        user_id: req.params.userId,
      },
    });
    if (!data) {
      res.status(404).json({ message: "No post found with this id" });
      return;
    }
    res.json(data);
  } catch (err) {
    console.log(err);
    // res.status(500).json(err);
  }
});

module.exports = router;
