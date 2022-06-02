import {
  Add,
  PlayArrow,
  ThumbsUpDownOutlined,
  ThumbUpOutlined,
  ThumbUpAltOutlined,
  ThumbDownAltOutlined,
} from "@material-ui/icons";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "./listItem.scss";
const ListItem = ({ index, item }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [movie, setMovie] = useState({});
  useEffect(() => {
    const getMovie = async () => {
      try {
        const res = await axios.get(
          "http://localhost:8080/api/movies/get/" + item
        );
        setMovie(res);
      } catch (err) {
        console.log(err);
      }
    };
    getMovie();
  }, [item]);
  return (
    <Link to={{ pathname: "/watch" }} state={{ movie: movie }}>
      <div
        className="listItem"
        style={{ left: isHovered && index * 225 }}
        onMouseOver={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <img src={movie.img} alt="" />
        {isHovered && (
          <>
            {/* <video src={movie.data.trailer} autoPlay={true} loop /> */}
            <div className="itemInfo">
              <div className="icons">
                <PlayArrow className="icon" />
                <Add className="icon" />
                <ThumbUpOutlined className="icon" />
                <ThumbDownAltOutlined className="icon" />
              </div>
              <div className="itemInfoTop">
                <span>1 hours 14 mins</span>
                <span className="limit">+{movie.limit}</span>
                <span>{movie.year}</span>
              </div>
              <p className="desc">{movie.desc}</p>
              <div className="genre">{movie.genre}</div>
            </div>
          </>
        )}
      </div>
    </Link>
  );
};
export default ListItem;
