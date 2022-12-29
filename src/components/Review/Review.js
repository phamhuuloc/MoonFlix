import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ratingMovieAPi from "../../api/ratingMovieApi";
import { useEffect } from "react";
import userApi from "../../api/userApi";
import { listRatingSlice } from "../../redux/reducer/listRating";
import "./review.scss";

const Review = (props) => {
 // get all rating and commnet of user for movie 
 const dispatch = useDispatch()
 const movieId = props.movieId;
  const ratingMovieList = useSelector((state) => state.listRating.listRating);
  const getAllRating = async () => {
    try {
      const res = await ratingMovieAPi.getAllRatingOfMovie(movieId);
      
      console.log(res)
      dispatch(listRatingSlice.actions.setlistRating(res));
      
      
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    getAllRating();

  }, []);
  console.log(ratingMovieList)
  // get info of user 
  
  
  const user = useSelector((state) => state.user.user);
  

  const [r_content , setRcontent] = useState ("")


  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);

  const postRatingForMovie = async () => {
    try{
      const res =await ratingMovieAPi.createRating({r_number_star: rating , r_user_id : user.id, r_movie_id : movieId , r_content: r_content})
      setRcontent("");
      setRating(0)
      getAllRating();
      console.log(res)

    }catch(err){
      console.log(err);
    }
  }
  return (
    <>
      <div className="section__header mb-2">
                <h2>Review({ratingMovieList.length})</h2>
      </div>
      <ul className="reviewer_list">
        {
          ratingMovieList.map((user, index) => {
            return (
              <React.Fragment>
              <li className="review_item">
              <div className="image_user">
                <img src={user.profilePic} />
              </div>
              <div className="review_container">
              <div className="reviewer_name">{user.username}</div>
              <div className="review_time">{user.create_at}</div>
              <div className="reviewer_content">
                {user.r_content}
               </div>
              </div>
              
              </li>
            
                </React.Fragment>
            );
        
          })
        }
  
      </ul>

      <div className="review_input_container">
      <div className="star-rating">
        <span className="star-rating-title">
        Rating For Movie: 
        </span>
     
      {[...Array(5)].map((star, index) => {
        index += 1;
        return (
          <button
            type="button"
            key={index}
            className={index <= (hover || rating) ? "on" : "off"}
            onClick={() => setRating(index)}
            onMouseEnter={() => setHover(index)}
            onMouseLeave={() => setHover(rating)}
          >
            <span className="rate">&#9733;</span>
          </button>
        );
      })}
    </div>
        <div className="image_user">
          <img src={user.profilePic} />
        <h6 className="reviewer_name">{user.name}</h6>
        </div>
        <input
          className="review_input"
          placeholder="Để lại bình luận cho chúng tôi"
          value={r_content}
          onChange={(e) => setRcontent(e.target.value)}
        />
        <button className="review_post_btn" onClick={ () => postRatingForMovie()}>POST</button>
      </div>
    </>
  );
    
};


export default Review;
