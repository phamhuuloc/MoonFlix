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
  // const trailer =
  //   "https://player.vimeo.com/external/371433846.sd.mp4?s=236da2f3c0fd273d2c6d9a064f3ae35579b2bbdf&profile_id=139&oauth2_token_id=57447761";
  useEffect(() => {
    const getMovie = async () => {
      try {
        const res = await axios.get(
          "http://localhost:8080/api/movies/get/" + item
        );
        setMovie(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getMovie();
  }, [item]);
  return (
    <Link to={{ pathname: "/watch", state: { movie: movie } }}>
      <div
        className="listItem"
        style={{ left: isHovered && index * 225 }}
        onMouseOver={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <img
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTX7lE7pz8fVAWoebgjfb88uGI3F9uBihf06w&usqp=CAU"
          alt=""
        />
        {isHovered && (
          <>
            <video src={movie.data.trailer} autoPlay={true} loop />
            <div className="itemInfo">
              <div className="icons">
                <PlayArrow className="icon" />
                <Add className="icon" />
                <ThumbUpOutlined className="icon" />
                <ThumbDownAltOutlined className="icon" />
              </div>
              <div className="itemInfoTop">
                <span>1 hours 14 mins</span>
                <span className="limit">+{movie.data.limit}</span>
                <span>{movie.data.year}</span>
              </div>
              <p className="desc">{movie.data.desc}</p>
              <div className="genre">{movie.data.genre}</div>
            </div>
          </>
        )}
      </div>
    </Link>
  );
};
export default ListItem;
