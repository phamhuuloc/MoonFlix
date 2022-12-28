import React, { useEffect, useState, useRef } from "react";
import { useParams } from "react-router";
import { useLocation } from "react-router-dom";
import Navbar from "../../components/Navbar/Navbar";
import userApi from "../../api/userApi";
import { toast } from "react-toastify";
import { userSlice } from "../../redux/reducer/userSlice";
import { useSelector, useDispatch } from "react-redux";
import "./detail.scss";
import axios from "axios";
import Review from "../../components/Review/Review";

const Detail = () => {
  const location = useLocation();
  const item = location.state.movieData;

  console.log("CHECKK DETAIL==>>> ", item);

  let userInfo = useSelector((state) => state.user.user);
  const userMovies = userInfo.movies_list;
  const iframeRef = useRef(null);
  const dispatch = useDispatch();

  /*  const result = userMovies.find((movie) => movie.movie_id === item._id); */
  console.log(userMovies);
  console.log(item._id);

  /*  console.log(result); */

  /*  const handleByMovie = async () => {
    if (!result) {
      try {
        const data = { movie_id: item._id };
        console.log(data);
        const res = await userApi.buyMovie(data);
        console.log(res.message);
        toast.success(res.message);
        const newUserInfo = await userApi.newUserInfo(userInfo._id);
        window.localStorage.setItem("user", JSON.stringify(newUserInfo.user));
        dispatch(userSlice.actions.setUser(newUserInfo.user));
      } catch (err) {
        console.log(err);
      }
    } else {
      toast.error("The movie already exits in your movie list!");
    }
  }; */

  return (
    <>
      {item && (
        <>
          <Navbar />
          <div
            className="banner"
            style={{
              backgroundImage: `url(${item.imgSm})`,
            }}
          ></div>
          <div className="mb-3 movie-content container">
            <div className="movie-content__poster">
              <div
                className="movie-content__poster__img"
                style={{
                  backgroundImage: `url(${item.img})`,
                }}
              ></div>
            </div>
            <div className="movie-content__info">
              <h1 className="title">{item.title || item.name}</h1>
              <ul>
                <li className="desc_movie">{item._desc}</li>
                <li className="year_release">
                  <span className="font_weight">Năm Phát Hành:</span>{" "}
                  {item.year}
                </li>
                {/*  <li>Thể Loại: {item.genre}</li> */}
                <li className="age">
                  <span className="font_weight">Độ Tuổi:</span>{" "}
                  <span className="age_limit">{item._limit}+</span>
                </li>
              </ul>
              <h3 className="price_movie">
                Giá: {item.price === 0 ? "Free" : `${item.price}đ`}
              </h3>
              <div className="movie-content__buttons">
                <a className="movie-content__buttons-trailer" href="#trailer">
                  Trailer
                </a>
                <a
                  className="movie-content__buttons-by"
                  /*  onClick={() => handleByMovie()} */
                >
                  Mua Phim
                </a>
              </div>
            </div>
          </div>
          <div className="movie-container">
            <h2>Nội Dung</h2>
            <p className="overview">{item.desc}</p>
            <div className="section mb-3">
              <div className="video">
                <div className="video__title">
                  <h2>{item.title}</h2>
                </div>
                <iframe
                  width="100%"
                  height="400"
                  src={`https://www.youtube.com/embed/${item.trailer}`}
                  title="YouTube video player"
                  frameborder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowfullscreen
                ></iframe>
              </div>
            </div>
            <div className="section mb-3">
              <div className="section__header mb-2">
                <h2>Similar</h2>
              </div>
              {/* <MovieList */}
              {/*     category={category} */}
              {/*     type="similar" */}
              {/*     id={item.id} */}
              {/* /> */}
            </div>
            <div className="section mb-3">
              <div className="section__header mb-2">
                <h2>Review(1)</h2>
              </div>
              <Review />
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default Detail;
