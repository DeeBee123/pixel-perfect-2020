import React from "react";
import "./review-card.scss";
import { CounterBox } from "components";
import starIcon from "assets/rating-star.svg";
import PropTypes from "prop-types";

export const ReviewCardShape = {
  userName: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  comment: PropTypes.string.isRequired,
  rating: PropTypes.number.isRequired,
};

export const ReviewCard = ({ userName, comment, rating }) => (
  <div className="card review-section__card-container">
    <div className="review-section__review">
      <p className="review-section__username">{userName}</p>
      <p className="review-section__comment">{comment}</p>
      <CounterBox
        value={rating}
        icon={starIcon}
        invertedColors={false}
        altTag={"rating"}
      />
    </div>
  </div>
);

ReviewCard.propTypes = ReviewCardShape;
