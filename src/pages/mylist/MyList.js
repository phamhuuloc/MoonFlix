import { useState, useEffect } from "react";
import "./myList.scss";
import { useDispatch, useSelector , } from "react-redux";
import movieApi from "../../api/movieApi";
import Navbar from "../../components/Navbar/Navbar";
import { Link } from "react-router-dom";
import MyListCardMovie from "../myListCartMovie/MyListCardMovie";
import userApi from "../../api/userApi";
import { userMovieSlice } from "../../redux/reducer/userMovie";
const MyList = () => {
  const dispatch = useDispatch()
  const user = useSelector((state) => state.user.user)
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
  console.log(userMovieList)

  return (
    <>
      <Navbar />
      <div className="my-list">
        <h3>My List</h3>
        <ul className="my-list__container">
          {userMovieList.map((item) => {
            return <MyListCardMovie id={item.id} />;
          })}
        </ul>
      </div>
    </>
  );
};
export default MyList;
