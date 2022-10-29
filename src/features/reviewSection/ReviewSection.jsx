import React from "react";
import PropTypes from "prop-types";
import { ReviewCard, ReviewCardShape } from "./components/reviewCard";

export const ReviewSection = ({ reviews }) => {
  return (
    <section className="review-section">
      <h3 className="restaurant-page-section-title">Reviews</h3>
      {reviews.length !== 0 ? (
        reviews.map((review) => <ReviewCard key={review.id} {...review} />)
      ) : (
        <div className="review-section__no-reviews">No reviews yet</div>
      )}
      {reviews.length >= 3 && <button className="btn-medium">Show more</button>}
    </section>
  );
};

ReviewSection.propTypes = {
  reviews: PropTypes.arrayOf(PropTypes.shape(ReviewCardShape)).isRequired,
};
