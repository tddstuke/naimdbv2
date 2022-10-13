import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import http from "../http-common";
// import useFetch from "react-fetch-hook";
import Auth from "../utils/auth";

const Dashboard = () => {
  const { username } = useParams();
  const [email, setEmail] = useState("");
  const [userId, setUserId] = useState("");
  const [movieIds, setMovieIds] = useState([]);
  const [movies, setMovies] = useState([]);

  //   get user email on load
  useEffect(() => {
    setEmail(Auth.getProfile().data.email);
  }, []);

  //   once email is set use it to retrieve userId
  useEffect(() => {
    try {
      const getUser = async () => {
        const data = await http.get(`/users/${email}`);
        setUserId(data.data);
      };
      getUser();
    } catch (error) {
      console.log(error);
    }
  }, [email]);

  //   retrieve movieIds using userId
  useEffect(() => {
    const getMovieIds = async () => {
      const { data } = await http.get(`/dashboard/movieids/${userId}`);
      const movie_ids = data.map((data) => data.movie_id);
      setMovieIds(movie_ids);
    };
    console.log(userId);
    getMovieIds();
  }, [userId]);

  // retrieve user movies using movieIds from TMDB
  useEffect(() => {
    const getMovies = async () => {
      try {
        const data = movieIds.map(async (movieId) => {
          const movieData = await http.get(`dashboard/movies/${movieId}`);
          return movieData.data;
        });
        const movieArray = await Promise.all(data);
        console.log(movieArray);
        // console.log(data);
        setMovies(movieArray);
      } catch (error) {
        console.log(error);
      }
    };
    getMovies();
    console.log(movies);
  }, [movieIds]);

  console.log(movies.data);

  return (
    <div>
      <div>{username}</div>
      <div>
        {movies?.map((movie) => (
          <div>{movie.title}</div>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
