import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import http from "../http-common";

const Home = () => {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    const getMovies = async () => {
      const data = await http.get("/home");
      console.log(data.data);
      setMovies(data.data);
    };
    getMovies();
  }, []);

  return (
    <>
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
          </div>
        ))}
      </div>
    </>
  );
};

export default Home;
