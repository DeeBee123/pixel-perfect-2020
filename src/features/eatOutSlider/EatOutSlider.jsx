import React, { useState } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import "./eat-out-slider.scss";
import { createPathFromString } from "utils/createPathFromString";
import { DotButton } from "./components/DotButton";
import { SliderButtons } from "components";

export const EatOutSlider = ({ randomRestaurants }) => {
  const [currentSlide, setSlide] = useState(0);
  const currentRestaurant = randomRestaurants[currentSlide];

  const prev = () => {
    setSlide(currentSlide - 1);
  };
  const next = () => {
    currentSlide !== randomRestaurants.length - 1 && setSlide(currentSlide + 1);
  };

  return (
    <div className="eat-out-slider">
      <div className="eat-out-slider__image-container">
        <img
          className="eat-out-slider__image"
          src={currentRestaurant.image}
          alt={currentRestaurant.name}
        />
      </div>
      <div className="eat-out-slider__details">
        <div className="eat-out-slider__navigation">
          <div className="eat-out-slider__dots-container">
            {randomRestaurants.map((randomRestaurant, index) => (
              <DotButton
                setSlide={setSlide}
                currentSlide={currentSlide}
                key={`dot-button-${randomRestaurant.id}`}
                index={index}
              />
            ))}
          </div>
          <SliderButtons
            prev={prev}
            next={next}
            previousDisabled={currentSlide === 0}
            nextDisabled={currentSlide === randomRestaurants.length - 1}
          />
        </div>
        <span className="eat-out-slider__label">
          Feel the taste of {currentRestaurant.label}
        </span>
        <h2 className="eat-out-slider__title">{currentRestaurant.name}</h2>
        <p className="eat-out-slider__description">
          {currentRestaurant.description}
        </p>
        <Link
          className="btn-large btn-large--red"
          to={`/eatout/${createPathFromString(currentRestaurant.name)}`}
        >
          LEARN MORE
        </Link>
      </div>
    </div>
  );
};

EatOutSlider.propTypes = {
  randomRestaurants: PropTypes.arrayOf(
    PropTypes.shape({
      description: PropTypes.string,
      image: PropTypes.string,
      label: PropTypes.string,
      name: PropTypes.string,
      id: PropTypes.string,
    })
  ),
};
