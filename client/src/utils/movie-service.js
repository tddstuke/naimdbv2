const axios = require("axios");
// require("dotenv").config();
const apiUrl = "https://api.themoviedb.org/3/search/movie/?api_key=";
const byIdUrl = "https://api.themoviedb.org/3/movie/";
const trendingUrl = "https://api.themoviedb.org/3/trending/movie/day";

const key = process.env.REACT_APP_API_KEY;

module.exports = {
  fetchByName(movieName) {
    const query_name = movieName.split(" ").join("+");
    return axios.get(`${apiUrl}${key}&query=${query_name}`);
  },

  FetchByID(movieId) {
    const id = movieId;
    return axios.get(`${byIdUrl}${id}?api_key=${key}`);
  },

  fetchTrending() {
    return axios.get(`${trendingUrl}?api_key=${key}`);
  },
};
