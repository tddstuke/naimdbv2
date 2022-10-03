const router = require("express").Router();
const {
  fetchTrending,
  FetchByID,
  fetchByName,
} = require("../../services/movie-service");

router.get("/", async (req, res) => {
  try {
    const { data } = await fetchTrending();
    res.json(data.results);
  } catch (err) {
    console.log(err);
  }
});

router.get("/movieid/:id", async (req, res) => {
  try {
    console.log(req.params);
    const { data } = await FetchByID(req.params.id);
    console.log(data);
    res.json(data);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});
router.get("/moviename/:name", async (req, res) => {
  try {
    console.log(req.params);
    const { data } = await fetchByName(req.params.name);
    console.log(data);
    res.json(data);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

module.exports = router;
