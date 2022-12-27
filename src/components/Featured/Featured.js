import { PlayArrow } from "@material-ui/icons";
import { Info } from "@material-ui/icons";
import { useEffect, useState } from "react";
import React from "react";
import Banner from "../Banner/Banner";
import axios from "axios";
import "./featured.scss";
import movieApi from "../../api/movieApi";
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
const Featured = ({ type, setGenre }) => {
  const [content, setContent] = useState({});
  const [currentIndex, setCurrentIndex] = useState(0);

  const [topMovie, setTopMovie] = useState([]);
  let arraytest = [];

  const getTopTenMovie = async () => {
    try {
      const res = await movieApi.getTopMovie();
      console.log(res.success);
      setTopMovie(res.data);
      // if (res && res.success === true) {
      //   setTopMovie(res.data);
      // }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getTopTenMovie();
  }, []);

  console.log(topMovie)
  

  const gotoNext = () => {
    const isLastSlide = currentIndex == topMovie.length - 1;
    const newItem = isLastSlide ? 0 : currentIndex + 1;
    setCurrentIndex(newItem);
  };
  const gotoFirst = () => {
    const isFirstSlide = currentIndex == 0;
    const newItem = isFirstSlide ? topMovie.length - 1 : currentIndex - 1;
    setCurrentIndex(newItem);
  };

      const responsive = {
        desktop: {
          breakpoint: { max: 3000, min: 1024 },
          items: 1,
          slidesToSlide: 1 // optional, default to 1.
        },
      };
  
      return (
        <React.Fragment>
          {
            <Carousel
            responsive={responsive}
            >{
            topMovie.map((movie,  index) => {
              return (
              <div className="featured" key={movie.id}>
                {/* <Banner /> */}
                <div>
                <img src={!movie.imgSm ? " " : movie.imgSm} alt="" />
                </div>
              
                <div className="info">
                    <span className="name_movie">{movie.title}</span>
                    <span className="desc">
                      {movie._desc}
                    </span>
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
            )
          })
        }
           </Carousel>
          
        }
        </React.Fragment>
        
      )
     
            
      {/* </Carousel> */}
      {/* </div> */}
   
  
};
export default Featured;
