import React from "react";
import starIcon from "assets/rating-star.svg";
import { CounterBox } from "components";
import PropTypes from "prop-types";

/*
  *ratingValue forces to render a rating value.
  this is ok for component testing purposes because
  SFE2G-63 task will remake this component to be fully functional and reusable
*/

export const RatingStars = ({ reviews, ratingValue }) => {
  const getAverage = (average) =>
    average.reduce((a, b) => {
      return a + b;
    }, 0) / average.length;

  const ratings = reviews ? reviews.map((review) => review.rating) : null;

  const averageRating =
    reviews && getAverage(ratings)
      ? Math.round(getAverage(ratings) * 10) / 10
      : -1;

  return (
    <CounterBox
      value={ratingValue || averageRating}
      icon={starIcon}
      invertedColors={false}
      altTag={"rating"}
    />
  );
};

RatingStars.propTypes = {
  reviews: PropTypes.arrayOf(
    PropTypes.shape({
      rating: PropTypes.number,
    })
  ),
  ratingValue: PropTypes.number,
};
