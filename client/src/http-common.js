import axios from "axios";

export default axios.create({
  baseURL: "http://localhost:3001/api",
  // baseURL: "https://agile-springs-04238.herokuapp.com/api",
  headers: {
    "Content-type": "application/json",
  },
});
