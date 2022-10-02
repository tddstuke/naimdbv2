import React, { useEffect, useState } from "react";
import http from "../http-common";

const SingleMovie = ({ id }) => {
  return (
    <div>
      <h3>{id}</h3>
    </div>
  );
};

export default SingleMovie;
