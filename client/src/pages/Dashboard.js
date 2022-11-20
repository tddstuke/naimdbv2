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

  //   get username from userId params
  useEffect(() => {
    try {
      const getUser = async () => {
        const data = await http.get(`/users/id/${userId}`);
        // console.log(data);
        setUsername(data.data.username);
      };
      getUser();
    } catch (error) {
      console.log(error);
    }
  }, [userId]);

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
    // const newMovieIds = movieIds.filter((id) => id !== e.target.id) || [];
    // console.log(newMovieIds);
    // setMovieIds(...newMovieIds);
    // window.location.reload();
    document.location.reload(true);
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
    // setShowIds(showIds.filter((id) => id !== e.target.id));
    // let index = showIds.indexOf(e.target.id);
    // if (index !== -1) {
    //   showIds.splice(index, 1);
    //   setShowIds(...showIds);
    // }
    // console.log(showIds);
    document.location.reload(true);
  };

  console.log(movies);
  // console.log(showIds);

  return (
    <>
      {movies.length > 0 && (
        <h1 className="text-xl uppercase text-center mt-4">
          {username}'s Movies
        </h1>
      )}

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
            <div className="flex justify-center pb-3">
              {me && (
                <TiDeleteOutline
                  className="cursor-pointer"
                  id={movie.id}
                  onClick={deleteMovie}
                />
              )}
            </div>
          </div>
        ))}
      </div>
      {shows.length > 0 && (
        <h1 className="text-xl uppercase text-center mt-4">
          {username}'s Shows
        </h1>
      )}
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
            <div className="flex justify-center pb-3">
              {me && (
                <TiDeleteOutline
                  className="cursor-pointer"
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
