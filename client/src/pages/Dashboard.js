import React, { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import http from "../http-common";
// import useFetch from "react-fetch-hook";
import Auth from "../utils/auth";

const Dashboard = () => {
  const { username } = useParams();
  const email = Auth.getProfile().data.email;
  // const [email, setEmail] = useState("");
  const [userId, setUserId] = useState("");
  const [movieIds, setMovieIds] = useState([]);
  const [movies, setMovies] = useState([]);
  const [showIds, setShowIds] = useState([]);
  const [shows, setShows] = useState([]);

  //   get user email on load
  useEffect(() => {
    // setEmail(Auth.getProfile().data.email);
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
    const getShowIds = async () => {
      const { data } = await http.get(`/dashboard/showids/${userId}`);
      const show_ids = data.map((data) => data.show_id);
      setShowIds(show_ids);
    };
    getShowIds();
    getMovieIds();
  }, [userId]);

  console.log(showIds);
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

    const getShows = async () => {
      try {
        const data = showIds.map(async (showId) => {
          const showData = await http.get(`dashboard/shows/${showId}`);
          return showData.data;
        });
        const showArray = await Promise.all(data);
        console.log(showArray);
        // console.log(data);
        setShows(showArray);
      } catch (error) {
        console.log(error);
      }
    };
    getMovies();
    getShows();
  }, [movieIds, showIds]);

  console.log(movies);
  console.log(shows);

  return (
    <>
      <h1 className="text-xl uppercase text-center mt-4">
        {username}'s Movies
      </h1>
      <div className="flex max-w-full md:justify-around justify-center flex-wrap">
        {movies.map((movie) => (
          <div
            key={movie.id}
            className="md:w-1/5 m-4 rounded overflow-hidden md:shadow-2xl"
          >
            <Link to={`/movieid/${movie.id}`}>
              <div className="p-3 ">
                <img
                  id={movie.id}
                  src={`http://image.tmdb.org/t/p/w500/${movie.poster_path}`}
                  alt="selected movie poster"
                  className="rounded"
                />
              </div>
            </Link>
            <button>Remove Movie</button>
          </div>
        ))}
      </div>
      <h1 className="text-xl uppercase text-center mt-4">{username}'s Shows</h1>
      <div className="flex max-w-full md:justify-around justify-center flex-wrap">
        {shows.map((show) => (
          <div
            key={show.id}
            className="md:w-1/5 m-4 rounded overflow-hidden md:shadow-2xl"
          >
            <Link to={`/showid/${show.id}`}>
              <div className="p-3 ">
                <img
                  id={show.id}
                  src={`http://image.tmdb.org/t/p/w500/${show.poster_path}`}
                  alt="selected movie poster"
                  className="rounded"
                />
              </div>
            </Link>
            <button>Remove Show</button>
          </div>
        ))}
      </div>
    </>
  );
};

export default Dashboard;
