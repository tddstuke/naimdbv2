import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import http from "../http-common";
import useFetch from "react-fetch-hook";

const SingleMovie = () => {
  const key = process.env.REACT_APP_API_KEY;
  const { id: movieId } = useParams();
  const [movie, setMovie] = useState("");

  useEffect(() => {
    const getMovie = async () => {
      const data = await http.get(`/home/movieid/${movieId}`);
      console.log(data.data);
      setMovie(data.data);
    };
    getMovie();
  }, [movieId]);

  const { isLoading, data } = useFetch(
    `https://api.themoviedb.org/3/movie/${movieId}/watch/providers?api_key=${key}`
  );
  if (isLoading) {
    return <div>loading...</div>;
  }
  const stream = data.results.US.flatrate;

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
          </div>
        </div>
      </div>
    </>
  );
};

export default SingleMovie;
