const axios = require("axios");
// require("dotenv").config();
const apiUrl = "https://api.themoviedb.org/3/search/tv?api_key=";
const byIdUrl = "https://api.themoviedb.org/3/tv/";
const trendingUrl = "https://api.themoviedb.org/3/trending/tv/day";

const key = process.env.REACT_APP_API_KEY;

module.exports = {
  fetchByShowName(showName) {
    const query_name = showName.split(" ").join("+");
    return axios.get(`${apiUrl}${key}&query=${query_name}`);
  },

  FetchByShowID(showId) {
    const id = showId;
    return axios.get(`${byIdUrl}${id}?api_key=${key}`);
  },

  fetchTrendingShows() {
    return axios.get(`${trendingUrl}?api_key=${key}`);
  },
};
