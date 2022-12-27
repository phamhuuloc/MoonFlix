import React, { useEffect, useState } from "react";
import Featured from "../../components/Featured/Featured";
import Navbar from "../../components/Navbar/Navbar";
import Banner from "../../components/Banner/Banner";
import List from "../../components/List/List";
import "./Home.scss";
import axios from "axios";
import listMovieApi from "../../api/listMovieApi";

const Home = ({ type }) => {
  const [lists, setLists] = useState([]);
  const [genre, setGenre] = useState(null);
  const [listMovie, setListMovie] = useState([]);

  useEffect(() => {
    const getRandomLists = async () => {
      try {
        const res = await axios.get(
          `https://sever-json-netflix.herokuapp.com/api/list${
            type ? "?type=" + type : ""
          }${genre ? "&genre=" + genre : ""}`
        );
        console.log(res);
        setLists(res.data.data);
      } catch (err) {
        console.log(err);
      }
    };
    getRandomLists();
  }, [type, genre]);

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
      const res = await listMovieApi.getListMovie();
      if (res && res.success === true) {
        setListMovie(res.data);
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getListMovive();
  }, []);

  const result = groupBy("list_title", listMovie);
  const newList = Object.entries(result);
  console.log(newList[0]);

  return (
    <div className="home">
      <Navbar />
      <Featured type={type} setGenre={setGenre} />
      {newList.map((list) => {
        return <List list={list} />;
      })}
    </div>
  );
};
export default Home;
