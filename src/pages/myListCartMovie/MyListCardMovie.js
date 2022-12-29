import movieApi from "../../api/movieApi";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./myListCardMovie.scss";
const MyListCardMovie = ({ id }) => {
  console.log(id);
  const [movie, setMovie] = useState({});
  useEffect(() => {
    const getMovieInfo = async () => {
      try {
        const res = await movieApi.getMovieInfo(id);
        console.log(res.data);
        setMovie(res.data); 
      } catch (err) {
        console.log(err);
      }
    };
    getMovieInfo();
  }, []);
  console.log(movie)
  return (
    <li key={movie.id} className="my-list__container__item">
      <iframe
        width="400px"
        height="100%"
        src={`https://www.youtube.com/embed/${movie.trailer}`}
        title="YouTube video player"
        frameborder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowfullscreen
      ></iframe>

      <h3>Name: {movie.title}</h3>
      <div className="my-list__container__item__info">
        {/* <span>{movie.genre}</span> */}
        <span>Year: {movie.year}</span>
        <span>Limit: {movie._limit}</span>
      </div>
      <div className="my-list__container__buttons">
        <Link
          className="my-list__container__buttons-trailer"
          to={{
            pathname: "api/movies/" + movie.id,
          }}
          state={{ movieData: movie }}
        >
          Info
        </Link>
        <Link
          className="my-list__container__buttons-by"
          to={{
            pathname: "/watch",
          }}
          state={{ movieData: movie }}
        >
          Watch
        </Link>
      </div>
    </li>
  );
};
export default MyListCardMovie;
