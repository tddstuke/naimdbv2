const router = require("express").Router();
const { fetchTrending } = require("../../services/movie-service");

router.get("/", async (req, res) => {
  try {
    const data = await fetchTrending();
    // console.log(data.data.results);
    res.json(data.data.results);
  } catch (err) {
    console.log(err);
  }
});

module.exports = router;
