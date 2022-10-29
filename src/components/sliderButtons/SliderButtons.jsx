import React, { useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";
import "./slider-buttons.scss";
import { ReactComponent as ArrowSVG } from "assets/navigation-arrow.svg";

export const SliderButtons = ({
  prev,
  next,
  previousDisabled,
  nextDisabled,
}) => {
  const [nextInFocus, setNextInFocus] = useState(false);
  const [prevInFocus, setPrevInFocus] = useState(false);
  const nextButton = useRef(null);
  const prevButton = useRef(null);

  useEffect(() => {
    // checking for if either button is focused is required
    // because in some components these arrow buttons are not
    // the only means of navigating through the slider
    if (nextInFocus && nextDisabled && prevButton?.current) {
      setPrevInFocus(true);
      setNextInFocus(false);
      prevButton.current.focus();
    } else if (prevInFocus && previousDisabled && nextButton?.current) {
      setPrevInFocus(false);
      setNextInFocus(true);
      nextButton.current.focus();
    }
  }, [nextDisabled, previousDisabled, nextInFocus, prevInFocus]);

  return (
    <div className="arrows">
      <button
        ref={prevButton}
        className="arrows__arrow-button arrows__arrow-button--rotated"
        disabled={previousDisabled}
        onClick={prev}
        onFocus={() => setPrevInFocus(true)}
        onBlur={() => setPrevInFocus(false)}
      >
        <span className="sr-only">Slide to left</span>
        <ArrowSVG className="arrows__arrow-button-svg" />
      </button>

      <button
        ref={nextButton}
        className="arrows__arrow-button"
        disabled={nextDisabled}
        onClick={next}
        onFocus={() => setNextInFocus(true)}
        onBlur={() => setNextInFocus(false)}
      >
        <span className="sr-only">Slide to right</span>
        <ArrowSVG className="arrows__arrow-button-svg" />
      </button>
    </div>
  );
};

SliderButtons.propTypes = {
  next: PropTypes.func,
  prev: PropTypes.func,
  previousDisabled: PropTypes.bool,
  nextDisabled: PropTypes.bool,
};
