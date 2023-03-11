import React, { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import http from "../http-common";
import useFetch from "react-fetch-hook";
import Auth from "../utils/auth";

const SingleShow = () => {
  const key = process.env.REACT_APP_API_KEY;
  const { id: showId } = useParams();
  const [email, setEmail] = useState("");
  const [show, setShow] = useState("");
  const [userId, setUserId] = useState("");
  const [isInShows, setIsInShows] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    Auth.loggedIn() && initializeData(Auth.getProfile().data.email);
  }, []);

  // get show data on load
  useEffect(() => {
    try {
      http.get(`/home/showid/${showId}`).then((data) => {
        setShow(data.data);
      });
    } catch (error) {
      console.log(error);
    }
  }, [showId]);

  async function initializeData(email) {
    try {
      const idData = await http.get(`/users/${email}`);
      const { data } = await http.get(`/dashboard/showids/${idData.data}`);
      const show_ids = data.map((data) => data.show_id);
      const isInShowsdata = show_ids.includes(parseInt(showId));
      setIsInShows(isInShowsdata);
      setUserId(idData.data);
    } catch (error) {
      console.log(error);
    }
  }

  const addShow = async () => {
    try {
      const data = await http.post("/shows", {
        show_id: showId,
        user_id: userId,
      });
      console.log(data);
      console.log("show added");
      navigate(`/dashboard/${userId}`);
    } catch (error) {
      console.log(error);
    }
  };

  // remove show from user's shows
  const deleteShow = async (e) => {
    e.preventDefault();
    try {
      const data = await http.delete(`/shows/${showId}/${userId}`);
    } catch (error) {
      console.log(error);
    }
    window.location.assign(`/dashboard/${userId}`);
  };

  const { isLoading, data } = useFetch(
    `https://api.themoviedb.org/3/tv/${showId}/watch/providers?api_key=${key}`
  );
  if (isLoading) {
    return <div>loading...</div>;
  }
  const stream = data.results.US?.flatrate;
  return (
    <>
      <div className="flex max-w-full md:justify-around justify-center flex-wrap ">
        <div className="md:w-4/5 m-4 rounded overflow-hidden md:shadow-2xl  justify-center md:flex">
          <div className="p-3 justify-center flex md:w-1/2">
            <img
              id={show.id}
              src={`http://image.tmdb.org/t/p/w500${show.poster_path}`}
              alt={show.title + "poster"}
              className="rounded"
            />
          </div>
          <div className="md:w-1/2">
            <ul className="m-5 space-y-5">
              <li className="">
                <span className="font-bold">Summary: </span> {show.overview}
              </li>
              <li className="">
                <span className="font-bold">Original Air Date: </span>{" "}
                {show.first_air_date}
              </li>
              <li className="">
                <span className="font-bold">Hompage Link: </span>
                <a
                  className="underline text-blue-600 hover:text-blue-800"
                  href={show.homepage}
                >
                  {show.name}
                </a>
              </li>
              <li className="">
                <span className="font-bold">Genres: </span>
                {show.genres?.map((genre) => " " + genre.name + ", ")}
              </li>
              <li className="">
                <span className="font-bold">Available to Stream: </span>
                {stream?.map((network) => " " + network.provider_name + ", ") ||
                  "Not available to stream for flatrate"}
              </li>
            </ul>
            <div className=" flex justify-center">
              {Auth.loggedIn() && !isInShows ? (
                <button
                  className="px-4 py-1 text-white bg-gray-600 rounded-md shadow hover:bg-gray-800  md:ml-2 md:mt-0 mt-2 md:w-1/2 w-full"
                  onClick={addShow}
                  type="button"
                >
                  Add Show
                </button>
              ) : Auth.loggedIn && isInShows ? (
                <button
                  className="px-4 py-1 text-white bg-gray-600 rounded-md shadow hover:bg-gray-800  md:ml-2 md:mt-0 mt-2 md:w-1/2 w-full"
                  onClick={deleteShow}
                  type="button"
                >
                  Remove Show
                </button>
              ) : (
                <div>
                  <p className="text-center">
                    To add this show to your Dashboard
                    <br />
                    <Link
                      className="underline text-blue-600 hover:text-blue-800"
                      to="/signup"
                    >
                      Sign Up
                    </Link>{" "}
                    or{" "}
                    <Link
                      className="underline text-blue-600 hover:text-blue-800"
                      to="/login"
                    >
                      Sign In
                    </Link>{" "}
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SingleShow;
