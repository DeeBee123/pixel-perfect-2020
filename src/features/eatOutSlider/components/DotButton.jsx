import React from "react";
import PropTypes from "prop-types";

export const DotButton = ({ index, currentSlide, setSlide }) => (
  <button
    key={`eat-out-slider-dot-${index}`}
    className={
      index === currentSlide
        ? "eat-out-slider__dot eat-out-slider__dot--active"
        : "eat-out-slider__dot"
    }
    onClick={() => setSlide(index)}
  >
    <span className="sr-only">
      {index === currentSlide ? "Current slide" : `Slide ${index + 1}`}
    </span>
  </button>
);

DotButton.propTypes = {
  index: PropTypes.number,
  currentSlide: PropTypes.number,
  setSlide: PropTypes.func,
};
