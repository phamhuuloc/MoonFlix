import React from "react";
import "./review.scss";

const Review = (props) => {
  return (
    <>
      <ul className="reviewer_list">
        <li className="image_user">
          <img src="https://znews-photo.zingcdn.me/w660/Uploaded/qfssu/2022_10_07/anh1_1.jpg" />
        </li>
        <li className="reviewer_name">Jayson</li>
        <li className="review_time">26/12/2022</li>
        <li className="reviewer_content">
          Phim này hay quá đừng mua nha các bạn Phim này hay quá đừng mua nha
          các bạn Phim này hay quá đừng mua nha các bạn Phim này hay quá đừng
          mua nha các bạn Phim này hay quá đừng mua nha các bạn Phim này hay quá
          đừng mua nha các bạn
        </li>
      </ul>

      <div className="review_input_container">
        <div className="image_user">
          <img src="https://znews-photo.zingcdn.me/w660/Uploaded/qfssu/2022_10_07/anh1_1.jpg" />
        <h6 className="reviewer_name">Jayson</h6>
        </div>
        <input
          className="review_input"
          placeholder="Để lại bình luận cho chúng tôi"
        />
        <button className="review_post_btn">POST</button>
      </div>
    </>
  );
};

export default Review;
