const router = require("express").Router();
const { Movie } = require("../../models");
const {
  fetchTrending,
  FetchByID,
  fetchByName,
} = require("../../services/movie-service");

// get movies by user_id
router.get("/movieids/:id", async (req, res) => {
  try {
    const data = await Movie.findAll({
      where: { user_id: req.params.id },
    });
    console.log(data);
    res.json(data);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
});

// fetch movies from TMDB using movie_ids
router.get("/movies/:movie_id", async (req, res) => {
  try {
    console.log(req.params);
    const { data } = await FetchByID(req.params.movie_id);
    console.log(data);
    res.json(data);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

module.exports = router;
