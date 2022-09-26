import React, { useEffect, useState } from "react";
// import { fetchTrending } from "../utils/movie-service";
// import useFetch from "react-fetch-hook";
import http from "../http-common";

// const key = process.env.REACT_APP_API_KEY;

const Home = () => {
  //   const { isLoading, error, data } = useFetch(
  //     `https://api.themoviedb.org/3/trending/movie/day?api_key=${key}`
  //     );
  // if (isLoading) return "Loading...";
  // if (error) return "Error!";

  const [movies, setMovies] = useState([]);

  useEffect(() => {
    const getMovies = async () => {
      const data = await http.get("/home");
      //   console.log(data.data);
      setMovies(data.data);
    };
    getMovies();
  }, []);

  const clickMovie = async (e) => {
    e.preventDefault();
    const movieId = e.target.id;
    const data = await http.get(`/home/movieid${movieId}`);
    console.log(data.data);
    window.location.href = "/movieid";
  };

  //   console.log(movies);

  return (
    <div className="flex max-w-full md:justify-around justify-center flex-wrap">
      {movies.map((movie) => (
        <div
          key={movie.id}
          onClick={clickMovie}
          className="md:w-1/5 m-4 rounded overflow-hidden md:shadow-2xl"
        >
          <div className="p-3 ">
            <img
              id={movie.id}
              src={`http://image.tmdb.org/t/p/w500/${movie.poster_path}`}
              alt="selected movie poster"
              className="rounded"
            />
          </div>
        </div>
      ))}
    </div>
  );
};

export default Home;
