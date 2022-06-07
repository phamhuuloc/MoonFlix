import { ArrowBackOutlined } from "@material-ui/icons";
import React from "react";
import { Link, useLocation } from "react-router-dom";

import "./watch.scss";
const Watch = () => {
  const location = useLocation();
  const movie = location.state.movieData;
  return (
    <div className="watch">
      <div className="back">
        <Link to="/">
          <ArrowBackOutlined />
          Home
        </Link>
      </div>
      <video className="video" autoPlay progress controls src={movie.video} />
    </div>
  );
};
export default Watch;
