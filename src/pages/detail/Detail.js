import React, { useEffect, useState, useRef } from "react";
import { useNavigate, useParams } from "react-router";
import { useLocation } from "react-router-dom";
import Navbar from "../../components/Navbar/Navbar";
import userApi from "../../api/userApi";
import { toast } from "react-toastify";
import { userSlice } from "../../redux/reducer/userSlice";
import { useSelector, useDispatch } from "react-redux";
import { userMovieSlice } from "../../redux/reducer/userMovie";
import "./detail.scss";
import axios from "axios";
import Review from "../../components/Review/Review";
import { Link } from "react-router-dom";

const Detail = () => {

  const location = useLocation();
  const navigate = useNavigate()
  const item = location.state.movieData;
  const user = useSelector((state) => state.user.user)

 
  const iframeRef = useRef(null);
  const dispatch = useDispatch();


 
  const userMovieList = useSelector((state) => state.userMovie.userMovie);
  useEffect(() => {
    const getMovie = async () => {
      try {
        const resUserMovie = await userApi.getAllMovieOfUser(user.id);
        
        dispatch(userMovieSlice.actions.setUserMovie(resUserMovie.data));
        
        
      } catch (err) {
        console.log(err);
      }
    };
    getMovie();
  }, []);
  




  
 



   const handleByMovie = async () => {
    const result = userMovieList.find((movie) => movie.id === item.id); 
    if (result == undefined) {
      try {
        const data = { um_movie_id: item.id, um_user_id: user.id };
        console.log(data);
        const res = await userApi.buyMovie(data);
        console.log(res);
        toast.success(res.message);
        navigate("/")
    
        dispatch(userMovieSlice.actions.setUserMovie(res.data));
        // const newUserInfo = await userApi.newUserInfo(userInfo._id);
        // window.localStorage.setItem("user", JSON.stringify(newUserInfo.user));
       
      } catch (err) {
        toast.error(err.response.data.message);
        console.log(err)
      }
    } else {
      toast.error("The movie already exits in your movie list!");
      
    }
  }; 

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
                  <span className="font_weight">Year:</span>{" "}
                  {item.year}
                </li>
                {/*  <li>Thể Loại: {item.genre}</li> */}
                <li className="age">
                  <span className="font_weight">Age Limit:</span>{" "}
                  <span className="age_limit">{item._limit}+</span>
                </li>
              </ul>
              <h3 className="price_movie">
                Price: {item.price === 0 ? "Free" : `${item.price}đ`}
              </h3>
              <div className="movie-content__buttons">
                {/* <a className="movie-content__buttons-trailer" href="#trailer">
                  Trailer
                </a> */}
                <Link
                className="movie-content__buttons-trailer"
                to={{
                  pathname: "/watch",
                }}
                state={{ movieData: item }}
              >
              Trailer
            </Link>
                <div
                  className="movie-content__buttons-by"
                  onClick={() =>  handleByMovie()} 
                >
                  Buy Movie
                </div>
              </div>
            </div>
          </div>
          <div className="movie-container">
            <h2>Content</h2>
            <p className="overview">{item._desc}</p>
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
              {/* <div className="section__header mb-2">
                <h2>Similar</h2>
              </div> */}
              {/* <MovieList */}
              {/*     category={category} */}
              {/*     type="similar" */}
              {/*     id={item.id} */}
              {/* /> */}
            </div>
            <div className="section mb-3">
              <Review movieId={item.id} />
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default Detail;
