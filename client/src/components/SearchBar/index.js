import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import http from "../../http-common";

const SearchBar = () => {
  const [movieTitle, setMovieTitle] = useState("");
  const [showTitle, setShowTitle] = useState("");
  const [movieId, setMovieId] = useState("");
  const [showId, setShowId] = useState("");
  const navigate = useNavigate();

  const handleMovieChange = (event) => {
    setMovieTitle(event.target.value);
  };
  const handleShowChange = (event) => {
    setShowTitle(event.target.value);
  };

  const handleMovieSubmit = async (event) => {
    event.preventDefault();
    try {
      const data = await http.get(`/home/moviename/${movieTitle}`);
      setMovieId(data.data.results[0].id);
    } catch (error) {
      console.log(error);
      alert("Sorry! No movie found with this title");
    }

    console.log(movieId);
    setMovieTitle("");
  };

  useEffect(() => {
    if (movieId) {
      navigate(`/movieid/${movieId}`);
      setMovieId("");
    }
  }, [movieId]);

  const handleShowSubmit = async (event) => {
    event.preventDefault();
    try {
      const data = await http.get(`/home/showname/${showTitle}`);
      console.log(data.data.results[0].id);
      setShowId(data.data.results[0].id);
    } catch (error) {
      console.log(error);
      alert("Sorry! No show found with that title");
    }
    // console.log(movieId);
    setShowTitle("");
  };

  useEffect(() => {
    if (showId) {
      navigate(`/showid/${showId}`);
      setShowId("");
    }
  }, [showId]);

  return (
    <div className=" flex flex-col justify-center items-center bg-black">
      <div className="w-full max-w-xlg px-4">
        <div className="lg:flex lg:items-center lg:justify-center mb-6 md:mr-8">
          <form className="w-full lg:flex">
            <div className="lg:w-1/4">
              <label className="block text-white lg:text-right mb-1 md:mb-0 pr-4 ">
                Enter Movie Title:
              </label>
            </div>
            <div className="lg:w-2/3">
              <input
                className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-1 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-blue-500"
                id="movie "
                type="text"
                placeholder="Movie Title"
                value={movieTitle}
                onChange={handleMovieChange}
              />
            </div>
            <button
              className="px-4 py-1 text-white bg-gray-600 rounded-md shadow hover:bg-gray-800 lg:ml-2 lg:mt-0 lg:mb-3 mt-2 lg:w-1/5 w-full"
              type="submit"
              onClick={handleMovieSubmit}
            >
              Search
            </button>
          </form>
          <form className="w-full lg:flex">
            <div className="lg:w-1/4">
              <label className="block text-white lg:text-right mb-1 lg:mb-0 pr-4">
                Enter Show Title:
              </label>
            </div>
            <div className="lg:w-2/3">
              <input
                className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-1 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-blue-500"
                id="inline-full-name"
                type="text"
                placeholder="Show Title"
                value={showTitle}
                onChange={handleShowChange}
              />
            </div>
            <button
              className="px-4 py-1 text-white bg-gray-600 rounded-md shadow hover:bg-gray-800 lg:ml-2 lg:mt-0 lg:mb-3 mt-2 lg:w-1/5 w-full"
              type="submit"
              onClick={handleShowSubmit}
            >
              Search
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SearchBar;
