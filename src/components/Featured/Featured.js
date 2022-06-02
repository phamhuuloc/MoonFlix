import { PlayArrow } from "@material-ui/icons";
import { Info } from "@material-ui/icons";
import { useEffect, useState } from "react";
import axios from "axios";
import "./featured.scss";
const Featured = ({ type, setGenre }) => {
  const [content, setContent] = useState({});
  useEffect(() => {
    try {
      const getRandomContent = async () => {
        const res = await axios.get(
          `http://localhost:8080/api/movies/random?type=${type}`
        );
        console.log(res);
        setContent(res);
      };
      getRandomContent();
    } catch (err) {
      console.log(err);
    }
  }, [type]);
  console.log(type);
  return (
    <div className="featured">
      {type && (
        <div className="category">
          <span>{type === "movie" ? "Movies" : "Series"}</span>
          <select
            name="genre"
            id="genre"
            onChange={(e) => setGenre(e.target.value)}
          >
            <option>genre</option>
            <option value="adventure">Adventure</option>
            <option value="comedy">Comedy</option>
            <option value="crime">Crime</option>
            <option value="fantasy">Fantasy</option>
            <option value="historical">Historical</option>
            <option value="horror">Horror</option>
            <option value="romance">Romance</option>
            <option value="sci-fi">Sci-fi</option>
            <option value="thriller">Thriller</option>
            <option value="western">Western</option>
            <option value="animation">Animation</option>
            <option value="drama">Drama</option>
            <option value="documentary">Documentary</option>
          </select>
        </div>
      )}
      <img src={content[0].img} alt="" />
      <div className="info">
        <p className="desc">{content[0].desc}</p>
        <div className="buttons">
          <button className="play">
            <PlayArrow className="button-icon" />
            <span>Play</span>
          </button>
          <button className="more">
            <Info className="button-icon" />
            <span>More</span>
          </button>
        </div>
      </div>
    </div>
  );
};
export default Featured;
