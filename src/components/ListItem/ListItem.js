import { PlayArrow } from "@material-ui/icons";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "./listItem.scss";
// import {Button} from "@material-ui/core";
import Button from "../button/Button";
const ListItem = ({ index, item }) => {
  // const [isHovered, setIsHovered] = useState(false);
  console.log(item);
  const [movie, setMovie] = useState({});
  useEffect(() => {
    const getMovie = async () => {
      const data = { movie_id: item };
      try {
        const res = await axios.post(
          "https://sever-json-netflix.herokuapp.com/api/movies/get",
          data
        );
        console.log(res);
        console.log(res.data.data);
        setMovie(res.data.data);
      } catch (err) {
        console.log(err);
      }
    };
    getMovie();
  }, []);
  return (
    <Link
      to={{
        pathname: "/movie/" + movie._id,
      }}
      state={{ movieData: movie }}
    >
      <div
        className="movie-card"
        style={{ backgroundImage: `url(${movie.img})` }}
      >
        <Button>
          <PlayArrow />
        </Button>
        <h3 className="movie-card-T">{movie.title || movie.name}</h3>
      </div>
    </Link>
  );
};
export default ListItem;
