import React, { useState } from "react";
import { fetchTrending } from "../utils/movie-service";
import useFetch from "react-fetch-hook";

const key = process.env.REACT_APP_API_KEY;

const Home = () => {
  const { isLoading, error, data } = useFetch(
    `https://api.themoviedb.org/3/trending/movie/day?api_key=${key}`
  );

  if (isLoading) return "Loading...";
  if (error) return "Error!";

  const movies = data.results;
  //   console.log(movies);

  //   console.log(movies);
  return (
    <div className="flex max-w-full md:justify-around justify-center flex-wrap">
      {movies.map((movie) => (
        <div key={movie.id} className="md:w-1/5 m-4">
          <div className="card">
            <div className="card-image">
              <figure className="image is4by3">
                <img
                  src={`http://image.tmdb.org/t/p/w500/${movie.poster_path}`}
                  alt="selected movie poster"
                />
              </figure>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Home;
