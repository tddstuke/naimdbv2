import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import http from "../http-common";
import Auth from "../utils/auth";
import { TiDeleteOutline } from "react-icons/ti";

const Dashboard = () => {
  const { userId } = useParams();
  const email = Auth.getProfile().data.email;
  const [loggedInId, setLoggedInId] = useState("");
  const [me, setMe] = useState(false);
  const [username, setUsername] = useState("");
  const [movieIds, setMovieIds] = useState([]);
  const [movies, setMovies] = useState([]);
  const [showIds, setShowIds] = useState([]);
  const [shows, setShows] = useState([]);
  const [icon, setIcon] = useState(false);

  //   get username from userId params
  useEffect(() => {
    try {
      const getUser = async () => {
        const data = await http.get(`/users/id/${userId}`);
        Auth.getProfile().data.email != data.data.email
          ? alertMessage()
          : setUsername(data.data.username);
      };
      getUser();
    } catch (error) {
      console.log(error);
    }
  }, [userId]);

  function alertMessage() {
    alert("Must be logged in to view the dashboard");
    window.location.assign("/login");
  }

  //   once email is set use it to retrieve userId
  useEffect(() => {
    try {
      const getUser = async () => {
        const data = await http.get(`/users/${email}`);
        // console.log(data.data);
        setLoggedInId(data.data);
      };
      getUser();
    } catch (error) {
      console.log(error);
    }
  }, [email]);

  useEffect(() => {
    if (parseInt(userId) === loggedInId) {
      setMe(true);
    }
    // console.log(me, loggedInId, parseInt(userId));
  }, [userId, loggedInId]);

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

  // console.log(showIds);
  // retrieve user movies using movieIds from TMDB
  useEffect(() => {
    const getMovies = async () => {
      if (movieIds) {
        try {
          const data = movieIds.map(async (movieId) => {
            const movieData = await http.get(`dashboard/movies/${movieId}`);
            return movieData.data;
          });
          const movieArray = await Promise.all(data);
          // console.log(movieArray);
          // console.log(data);
          setMovies(movieArray);
        } catch (error) {
          console.log(error);
        }
      }
    };
    getMovies();
  }, [movieIds]);

  useEffect(() => {
    const getShows = async () => {
      if (showIds) {
        try {
          const data = showIds.map(async (showId) => {
            const showData = await http.get(`dashboard/shows/${showId}`);
            return showData.data;
          });
          const showArray = await Promise.all(data);
          // console.log(showArray);
          // console.log(data);
          setShows(showArray);
        } catch (error) {
          console.log(error);
        }
      }
    };
    getShows();
  }, [showIds]);

  // remove movie from user's movies
  const deleteMovie = async (e) => {
    e.preventDefault();
    console.log(e.target.id);
    try {
      const data = await http.delete(`/movies/${e.target.id}/${userId}`, {});
    } catch (error) {
      console.log(error);
    }
    // filter ids to remove deleted movie
    setMovieIds(movieIds.filter((id) => id !== parseInt(e.target.id)));
    console.log(movieIds);
  };

  // remove show from user's shows
  const deleteShow = async (e) => {
    e.preventDefault();
    console.log(e.target.id);
    try {
      const data = await http.delete(`/shows/${e.target.id}/${userId}`, {});
      // window.location.reload();
    } catch (error) {
      console.log(error);
    }
    // filter ids to remove deleted show
    setShowIds(showIds.filter((id) => id !== parseInt(e.target.id)));
  };

  // console.log(movies);
  // console.log(movieIds);
  // console.log(showIds);

  return (
    <>
      <div className="max-w-sm flex flex-wrap justify-around text-center w-full md:w-1/2 mx-auto py-8">
        <h2 className="w-full text-lg font-bold">Set Icon Size</h2>
        <button
          className="px-4 py-1 text-white bg-gray-600 rounded-md shadow hover:bg-gray-800  md:ml-2 md:mt-0 mt-2 md:w-1/4 w-1/3"
          onClick={(e) => setIcon(true)}
        >
          Small
        </button>
        <button
          className="px-4 py-1 text-white bg-gray-600 rounded-md shadow hover:bg-gray-800  md:ml-2 md:mt-0 mt-2 md:w-1/4 w-1/3"
          onClick={(e) => setIcon(false)}
        >
          Large
        </button>
      </div>
      {movies.length > 0 && (
        <h1 className="text-3xl uppercase text-center mt-4 font-bold">
          {username}'s Movies
        </h1>
      )}

      <div className="flex max-w-full md:justify-around justify-center flex-wrap">
        {movies.map((movie) => (
          <div
            key={movie.id}
            className={
              icon
                ? "justify-around md:w-1/5 w-full m-4 rounded overflow-hidden md:shadow-2xl flex h-20"
                : "md:w-1/5 w-full m-4 rounded overflow-hidden md:shadow-2xl"
            }
          >
            <Link to={`/movieid/${movie.id}`} className={icon ? "w-1/3" : ""}>
              <div className="p-3">
                <img
                  id={movie.id}
                  src={`http://image.tmdb.org/t/p/w500/${movie.poster_path}`}
                  alt="selected movie poster"
                  className={icon ? "w-1/2 rounded" : "rounded"}
                />
              </div>
            </Link>
            <div
              className={
                icon ? "font-bold text-center my-auto w-1/3" : "hidden"
              }
            >
              {movie.title}
            </div>
            <div
              className={
                icon
                  ? "w-1/3 my-auto"
                  : "flex w-full justify-center pb-3 my-auto"
              }
            >
              {me && (
                <TiDeleteOutline
                  className="cursor-pointer mx-auto"
                  id={movie.id}
                  onClick={deleteMovie}
                />
              )}
            </div>
          </div>
        ))}
      </div>
      {shows.length > 0 && (
        <h1 className="text-3xl uppercase text-center mt-4 font-bold">
          {username}'s Shows
        </h1>
      )}
      <div className="flex max-w-full md:justify-around justify-center flex-wrap">
        {shows.map((show) => (
          <div
            key={show.id}
            className={
              icon
                ? "justify-around md:w-1/5 w-full m-4 rounded overflow-hidden md:shadow-2xl flex h-20"
                : "md:w-1/5 w-full m-4 rounded overflow-hidden md:shadow-2xl"
            }
          >
            <Link to={`/showid/${show.id}`} className={icon ? "w-1/3" : ""}>
              <div className="p-3 ">
                <img
                  id={show.id}
                  src={`http://image.tmdb.org/t/p/w500/${show.poster_path}`}
                  alt="selected movie poster"
                  className={icon ? "w-1/2 rounded" : "rounded"}
                />
              </div>
            </Link>
            <div
              className={
                icon ? "font-bold text-center my-auto w-1/3" : "hidden"
              }
            >
              {show.name}
            </div>
            <div
              className={
                icon
                  ? "w-1/3 my-auto"
                  : "flex w-full justify-center pb-3 my-auto"
              }
            >
              {me && (
                <TiDeleteOutline
                  className="cursor-pointer mx-auto"
                  id={show.id}
                  onClick={deleteShow}
                />
              )}
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default Dashboard;
