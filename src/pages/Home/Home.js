import React, { useEffect, useState } from "react";
import Featured from "../../components/Featured/Featured";
import Navbar from "../../components/Navbar/Navbar";
import Banner from "../../components/Banner/Banner";
import List from "../../components/List/List";
import "./Home.scss";
import axios from "axios";
import { userMovieSlice } from "../../redux/reducer/userMovie";
import listMovieApi from "../../api/listMovieApi";
import userApi from "../../api/userApi";
import { useDispatch , useSelector } from "react-redux";
import { userVoucherSlice } from "../../redux/reducer/userVoucher";


const Home = ({ type }) => {

  console.log(type)
  const [lists, setLists] = useState([]);
  const [genre, setGenre] = useState(null);
  const [listMovie, setListMovie] = useState([]);
  const user = useSelector((state) => state.user.user)
  console.log(user.id)


  const dispatch = useDispatch();
  const userMovieList = useSelector((state) => state.userMovie.userMovie);
  const userVoucherList = useSelector((state) => state.userVoucher.userVoucher);

  // console.log(userMovieList);
  // console.log(userVoucherList);


  useEffect(() => {
    const getMovie = async () => {
      try {
        const resUserMovie = await userApi.getAllMovieOfUser(user.id);
        const resUserVoucher = await userApi.getAllVoucherOfUser(user.id);  
        dispatch(userMovieSlice.actions.setUserMovie(resUserMovie.data));
        dispatch(userVoucherSlice.actions.setuserVoucher(resUserVoucher.data));
        
      } catch (err) {
        console.log(err);
      }
    };
    getMovie();
  }, []);


  const groupBy = (key, arr) =>
    arr.reduce(
      (cache, product) => ({
        ...cache,
        [product[key]]:
          product[key] in cache
            ? cache[product[key]].concat(product)
            : [product],
      }),
      {}
    );

  const getListMovive = async () => {
    try {
      const res = type == null ? await listMovieApi.getListMovie() : await listMovieApi.getListMovieWithType(type);
      console.log(res)
      if (res && res.success === true) {
        setListMovie(res.data);
      }

    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getListMovive();
  }, [type]);

  const result = groupBy("list_title", listMovie);
  const newList = Object.entries(result);

  console.log(newList)

  return (
    <div className="home">
      <Navbar />
      <Featured type={type} setGenre={setGenre} />
      {newList.map((list,index) => {
        return <List list={list}  key={index} />;
      })}
    </div>
  );
};
export default Home;
