import axios from "axios";

export default axios.create({
  // baseURL: "http://localhost:3001/api",
  baseURL: "https://naimdb.herokuapp.com/api",
  headers: {
    "Content-type": "application/json",
  },
});
