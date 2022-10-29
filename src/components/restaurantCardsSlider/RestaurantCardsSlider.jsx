import React, { useState, useEffect } from "react";
import { RestaurantCard, SliderButtons } from "components";
import "./restaurant-cards-slider.scss";
import PropTypes from "prop-types";

export const RestaurantCardsSlider = ({ filteredRestaurants, title }) => {
  const [currentSlide, setSlide] = useState(0);

  const onPrevClick = () => {
    currentSlide !== 0 && setSlide(currentSlide - 1);
  };

  const onNextClick = () => {
    setSlide(currentSlide + 1);
  };

  const debounce = (func, wait, immediate) => {
    let timeout;
    return function () {
      const context = this,
        args = arguments;
      const later = function () {
        timeout = null;
        if (!immediate) func.apply(context, args);
      };
      const callNow = immediate && !timeout;
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
      if (callNow) func.apply(context, args);
    };
  };

  const resetState = debounce(() => {
    setSlide(0);
  }, 40);

  useEffect(() => {
    window.addEventListener("resize", resetState);
    return () => window.removeEventListener("resize", resetState);
  });

  return (
    <section className="restaurant-cards-slider">
      <div className="restaurant-cards-slider__header">
        <h3 className="eatout-page-section-title">{title}</h3>
        <div className={"restaurant-cards-slider__header-arrows"}>
          <SliderButtons
            prev={onPrevClick}
            next={onNextClick}
            previousDisabled={currentSlide === 0}
            nextDisabled={
              filteredRestaurants.length <= 1 ||
              //
              (currentSlide === filteredRestaurants.length - 2 &&
                filteredRestaurants.length >= 2 &&
                !window.matchMedia("(max-width: 768px)").matches) ||
              //
              (currentSlide === filteredRestaurants.length - 1 &&
                filteredRestaurants.length >= 2 &&
                window.matchMedia("(max-width: 768px)").matches) ||
              //
              (currentSlide === filteredRestaurants.length - 3 &&
                filteredRestaurants.length >= 3 &&
                !window.matchMedia("(max-width: 1250px)").matches) ||
              //
              (currentSlide === filteredRestaurants.length - 1 &&
                filteredRestaurants.length >= 3 &&
                window.matchMedia("(max-width: 1250px)").matches)
            }
          />
        </div>
      </div>
      <div className="restaurant-cards-slider__container">
        {filteredRestaurants.length !== 0 ? (
          filteredRestaurants.map((restaurant) => (
            <div
              style={{
                transform: `translateX(${currentSlide * -100}%)`,
              }}
              className="restaurant-cards-slider__restaurant"
              key={restaurant.id}
            >
              <RestaurantCard
                restaurant={restaurant}
                onClickEvent={resetState}
              />
            </div>
          ))
        ) : (
          <div className="restaurant-cards-slider__not-found">
            Sorry, currently there are no matching suggestions.
          </div>
        )}
      </div>
    </section>
  );
};

RestaurantCardsSlider.propTypes = {
  filteredRestaurants: PropTypes.array,
  title: PropTypes.string,
};
