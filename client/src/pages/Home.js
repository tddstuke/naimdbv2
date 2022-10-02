import React, { useEffect, useState } from "react";
// import { fetchTrending } from "../utils/movie-service";
// import useFetch from "react-fetch-hook";
import { Link } from "react-router-dom";
import http from "../http-common";
import SearchBar from "../components/SearchBar";

// const key = process.env.REACT_APP_API_KEY;

const Home = () => {
  const [movies, setMovies] = useState([]);
  const [movieId, setMovieId] = useState("");

  //   const { isLoading, error, data } = useFetch("http://localhost:3001/api/home");
  //   if (isLoading) return "Loading...";
  //   if (error) return "Error!";
  //   //   console.log(data);
  //   const movies = data;

  //   useEffect(() => {
  //   }, [data, error]);

  useEffect(() => {
    const getMovies = async () => {
      const data = await http.get("/home");
      //   console.log(data.data);
      setMovies(data.data);
    };
    getMovies();
  }, []);

  // const clickMovie = (e) => {
  //   e.preventDefault();
  //   const id = e.target.id;
  //   setMovieId(id);
  //   console.log();
  //   // const data = await http.get(`/home/movieid${movieId}`);
  //   // console.log(data.data);
  //   // window.location.href = "/movieid";
  // };

  //   console.log(movies);

  return (
    <>
      <div className="flex max-w-full md:justify-around justify-center flex-wrap">
        {movies.map((movie) => (
          <div
            key={movie.id}
            // onClick={clickMovie}
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
          </div>
        ))}
      </div>
    </>
  );
};

export default Home;
