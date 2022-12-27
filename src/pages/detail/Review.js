import React from "react";
import './review.scss'


const Review = (props) => {
  return <>
    <div className="review_container">
        <h6>Review(<span>3</span>)</h6>
        <ul className="review_content_list">
            <li>
                <img src="https://znews-photo.zingcdn.me/w660/Uploaded/qfssu/2022_10_07/anh1_1.jpg"/>
                <h6>Name user</h6>
                <span>26/12/2022</span>
                <p>content</p>

            </li>
        </ul>
    </div>
  </>;
};

export default Review;
