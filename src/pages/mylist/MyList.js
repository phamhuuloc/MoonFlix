import { useState } from "react";
import "./myList.scss";
import { useSelector } from "react-redux";
import movieApi from "../../api/movieApi";
import Navbar from "../../components/Navbar/Navbar";
import { Link } from "react-router-dom";
import MyListCardMovie from "../myListCartMovie/MyListCardMovie";
const MyList = () => {
  let userInfo = useSelector((state) => state.user.user);
  console.log(userInfo);
  return (
    <>
      <Navbar />
      <div className="my-list">
        <h3>My List</h3>
        <ul className="my-list__container">
          {userInfo.movies_list.map((item) => {
            return <MyListCardMovie id={item.movie_id} />;
          })}
        </ul>
      </div>
    </>
  );
};
export default MyList;
