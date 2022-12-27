import React, { useEffect, useState } from "react";
import "./banner.scss";
import movieApi from "../../api/movieApi";

const Banner = ({ slides }) => {
  const image1 =
    "https://media.newyorker.com/photos/639cd0b6bc59f7f5349efb1b/master/pass/Brody-Avatar-2.jpg";
  const image3 =
    "https://media.newyorker.com/photos/639cd0b6bc59f7f5349efb1b/master/pass/Brody-Avatar-2.jpg";
  const image2 =
    "https://dailyresearchplot.com/wp-content/uploads/2022/10/2-308.jpg";

  /* const [movieImage, setMovieImage] = useState([]); */

  const slide = [];
    const [currentIndex, setCurrentIndex] = useState(0);

/*   useEffect(() => {
    const getTopTenMovie = async () => {
      try {
        const res = await movieApi.getTopMovie();
        for (let i = 0; i < res.data.length; i++) {
          slide.push(res.data[i].imgSm);
        }
      } catch (e) {
        console.log(e);
      }
    };
    getTopTenMovie();
  }, [currentIndex]);
 */

  const gotoNext = () => {
    const isLastSlide = currentIndex == slide.length - 1;
    const newItem = isLastSlide ? 0 : currentIndex + 1;
    setCurrentIndex(newItem);
  };
  const gotoFirst = () => {
    const isFirstSlide = currentIndex == 0;
    const newItem = isFirstSlide ? slide.length - 1 : currentIndex - 1;
    setCurrentIndex(newItem);
  };

/*   setInterval(
    () => (currentIndex < slide.length ? gotoNext() : gotoFirst()),
    5000
  );
 */
  return (
    <>
      <div
        className="banner_container"
        style={{ backgroundImage: `url(${slide[currentIndex]})` }}
      ></div>
    </>
  );
};

export default Banner;
