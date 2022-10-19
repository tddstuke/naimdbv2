const router = require("express").Router();
const sequelize = require("../../config/connection");
const { Show } = require("../../models");

router.get("/", async (req, res) => {
  try {
    const data = await Show.findAll({
      attributes: [
        "id",
        "show_id",
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
    const data = await Show.findOne({
      where: {
        show_id: req.params.id,
        user_id: req.body.id,
      },
      attributes: ["id", "show_id"],
      //   include: {model: USER, attributes: ["username"]},}
    });
    if (!data) {
      res.status(404).json({ message: "No show found with this id" });
      return;
    }
    res.json(data);
  } catch (err) {
    console.log(err);
    res.status(404).json(err);
  }
});

router.put("/:show_id", async (req, res) => {
  try {
    const data = await Show.update(
      {
        tag: req.body.tag,
      },
      {
        where: {
          show_id: req.params.show_id,
          user_id: req.session.user_id,
        },
      }
    );
    if (!data) {
      res.status(404).json({ message: "No show found with this id" });
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
    const data = await Show.create({
      // list_id: req.body.list_id,
      // overview: req.body.overview,
      // poster_path: req.body.poster_path,
      // title: req.body.title,
      show_id: req.body.show_id,
      user_id: req.body.user_id,
    });

    res.json(data);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const data = await Show.destroy({
      where: {
        id: req.params.id,
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
