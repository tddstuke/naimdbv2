import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import http from "../http-common";
import useFetch from "react-fetch-hook";
import Auth from "../utils/auth";
import auth from "../utils/auth";

const SingleMovie = () => {
  //   get user email and username from token
  if (Auth.loggedIn()) {
    const email = Auth.getProfile().data.email;
    const username = Auth.getProfile().data.username;
  }
  //else {
  //   const email = "";
  //   const username = "";
  // }
  const key = process.env.REACT_APP_API_KEY;
  const { id: movieId } = useParams();
  const [movie, setMovie] = useState("");
  const [email, setEmail] = useState("");
  const [userId, setUserId] = useState("");
  const [username, setUsername] = useState("");
  const navigate = useNavigate();

  // get movie data on load
  useEffect(() => {
    http.get(`/home/movieid/${movieId}`).then((data) => {
      setMovie(data.data);
    });
    // setEmail(Auth.getProfile().data.email);
    // setUsername(Auth.getProfile().data.username);
    // get user info using email
  }, [movieId]);

  useEffect(() => {
    const getUser = async () => {
      if (email) {
        try {
          const idData = await http.get(`/users/${email}`);
          console.log(idData.data);
          setUserId(idData.data);
        } catch (error) {
          console.log(error);
        }
      }
      getUser();
      console.log(userId);
    };
  }, [email]);

  // console.log(email);
  console.log(movie);
  // console.log(username);

  // add movie to users movies
  const addMovie = async () => {
    try {
      const data = await http.post("/movies", {
        movie_id: movieId,
        user_id: userId,
      });
      console.log(data);
      console.log("movie added");
      navigate(`/dashboard/${username}`);
      // setEmail("");
      // setMovie("");
      // setUserId("");
    } catch (error) {
      console.log(error);
    }
  };

  // get streaming information
  const { isLoading, error, data } = useFetch(
    `https://api.themoviedb.org/3/movie/${movieId}/watch/providers?api_key=${key}`
  );

  if (isLoading) {
    return <div>loading...</div>;
  }
  if (error) {
    return <div>error!</div>;
  }

  const stream = data.results.US?.flatrate || null;

  return (
    <>
      <div className="flex max-w-full md:justify-around justify-center flex-wrap ">
        <div className="md:w-4/5 m-4 rounded overflow-hidden md:shadow-2xl  justify-center md:flex">
          <div className="p-3 justify-center flex md:w-1/2">
            <img
              id={movie.id}
              src={`http://image.tmdb.org/t/p/w500${movie.poster_path}`}
              alt={movie.title + "poster"}
              className="rounded"
            />
          </div>
          <div className="md:w-1/2">
            <ul className="m-5 space-y-5">
              <li className="">
                <span className="font-bold">Summary: </span> {movie.overview}
              </li>
              <li className="">
                <span className="font-bold">Release Date: </span>{" "}
                {movie.release_date}
              </li>
              <li className="">
                <span className="font-bold">Hompage Link: </span>
                <a
                  className="underline text-blue-600 hover:text-blue-800"
                  href={movie.homepage}
                >
                  {movie.title}
                </a>
              </li>
              <li className="">
                <span className="font-bold">Genres: </span>
                {movie.genres?.map((genre) => " " + genre.name + ", ")}
              </li>
              <li className="">
                <span className="font-bold">Available to Stream: </span>
                {stream?.map((network) => " " + network.provider_name + ", ") ||
                  "Not available to stream for flatrate"}
              </li>
            </ul>
            <div className=" flex justify-center py-2">
              {Auth.loggedIn() && (
                <button
                  className="px-4 py-1 text-white bg-gray-600 rounded-md shadow hover:bg-gray-800  md:ml-2 md:mt-0 mt-2 md:w-1/2 w-full"
                  onClick={addMovie}
                  type="button"
                >
                  Add Movie
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SingleMovie;
