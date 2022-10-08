import React, { useEffect, useId, useState } from "react";
import { useParams, useRouteError } from "react-router-dom";
import http from "../http-common";
import useFetch from "react-fetch-hook";
import Auth from "../utils/auth";

const SingleMovie = () => {
  const key = process.env.REACT_APP_API_KEY;
  const { id: movieId } = useParams();
  const [movie, setMovie] = useState("");
  const [email, setEmail] = useState("");
  const [userId, setUserId] = useState("");

  useEffect(() => {
    const getMovie = async () => {
      const data = await http.get(`/home/movieid/${movieId}`);
      console.log(data.data);
      setMovie(data.data);
    };
    getMovie();
  }, [movieId]);

  const handleClick = async (e) => {
    e.preventDefault();
    const data = Auth.getProfile().data.email;
    setEmail(data);
    console.log(email);
  };
  useEffect(() => {
    const getUser = async () => {
      const data = await http.get(`/users/${email}`);
      setUserId(data.data.id);
    };
    getUser();
  }, [email]);
  console.log(userId);

  useEffect(() => {
    const addMovie = async () => {
      try {
        const data = await http.post("/movies", {
          movie_id: movieId,
          user_id: userId,
        });
        console.log(data);
      } catch (error) {
        console.log(error);
      }
    };
    addMovie();
    console.log("movie added");
  }, [userId]);

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
        <div
          // key={movie.id}
          // onClick={clickMovie}
          className="md:w-4/5 m-4 rounded overflow-hidden md:shadow-2xl  justify-center md:flex"
        >
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
            <div className=" flex justify-center">
              {Auth.loggedIn() && (
                <button
                  className="px-4 py-1 text-white bg-gray-600 rounded-md shadow hover:bg-gray-800 md:mt-0 mt-2 md:ml-2 md:mt-0 mt-2 md:w-1/2 w-full"
                  onClick={handleClick}
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
