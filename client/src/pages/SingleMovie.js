import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import http from "../http-common";
import movieService from "../utils/movie-service";

const SingleMovie = () => {
  const { id: movieId } = useParams();
  const [movie, setMovie] = useState("");

  useEffect(() => {
    const getMovie = async () => {
      const data = await http.get(`/home/movieid/${movieId}`);
      console.log(data.data);
      setMovie(data.data);
    };
    getMovie();
  }, []);

  return (
    <>
      <div className="flex max-w-full md:justify-around justify-center flex-wrap ">
        <div
          // key={movie.id}
          // onClick={clickMovie}
          className="md:w-full m-4 rounded overflow-hidden md:shadow-2xl md:justify-around justify-center md:flex"
        >
          <div className="p-3 md:w-1/2">
            <img
              id={movie.id}
              src={`http://image.tmdb.org/t/p/w500${movie.poster_path}`}
              alt={movie.title + "poster"}
              className="rounded"
            />
          </div>
          <div className="md:w-1/2">
            <ul className="m-5 space-y-5">
              <li className="">Summary: {movie.overview}</li>
              <li className="">Released on: {movie.release_date}</li>
              <li className="">
                Homepage: <a href={movie.homepage}>{movie.title}</a>
              </li>
              <li className="">
                Genres:
                {movie.genres &&
                  movie.genres.map((genre) => " " + genre.name + " ")}
              </li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};

export default SingleMovie;
