import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import http from "../http-common";
import useFetch from "react-fetch-hook";

const SingleShow = () => {
  const key = process.env.REACT_APP_API_KEY;
  const { id: showId } = useParams();
  const [show, setShow] = useState("");

  useEffect(() => {
    const getShow = async () => {
      const data = await http.get(`/home/showid/${showId}`);
      console.log(data.data);
      setShow(data.data);
    };
    getShow();
  }, [showId]);

  const { isLoading, data } = useFetch(
    `https://api.themoviedb.org/3/tv/${showId}/watch/providers?api_key=${key}`
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
          </div>
        </div>
      </div>
    </>
  );
};

export default SingleShow;
