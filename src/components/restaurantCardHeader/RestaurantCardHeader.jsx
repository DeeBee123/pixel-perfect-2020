import React from "react";
import "./restaurant-card-header.scss";
import personIcon from "assets/check-in-person.svg";
import { RedHeart, RatingStars, CounterBox } from "components";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { createPathFromString } from "utils/createPathFromString";
import { formatOpenHours } from "utils/restaurantDataFormatting";

export const RestaurantCardHeader = ({
  restaurant,
  showCheckIns,
  onClickEvent,
}) => {
  const restaurantLink = createPathFromString(restaurant.name);

  return (
    <div className="restaurant-card-header">
      <figure className="restaurant-card-header__image">
        <img
          className="restaurant-card-header__image-img"
          src={restaurant.image}
          alt={restaurant.name}
        />
      </figure>

      <div className="counter-box-container">
        {showCheckIns && (
          <CounterBox
            value={restaurant.checkIns}
            icon={personIcon}
            invertedColors={true}
            altTag={"check-ins"}
          />
        )}
        <RatingStars reviews={restaurant.reviews} />
      </div>

      <div className="card-bottom-container">
        <Link
          to={`/eatout/${restaurantLink}`}
          onClick={onClickEvent}
          className="restaurant-info"
        >
          <p className="restaurant-info__categories">
            {restaurant.categories.join(" \u2022 ")}
          </p>
          <h3 className="restaurant-info__title">{restaurant.name}</h3>
          <p className="restaurant-info__time">
            {formatOpenHours(restaurant.openingHours[0].hours)}
          </p>
        </Link>
        <div className="heart-container">
          <RedHeart />
        </div>
      </div>
    </div>
  );
};

RestaurantCardHeader.propTypes = {
  restaurant: PropTypes.shape({
    name: PropTypes.string,
    openingHours: PropTypes.arrayOf(
      PropTypes.shape({
        hours: PropTypes.string,
      })
    ),
    categories: PropTypes.array,
    image: PropTypes.string,
    checkIns: PropTypes.number,
    reviews: PropTypes.arrayOf(
      PropTypes.shape({
        rating: PropTypes.number,
      })
    ),
  }),
  showCheckIns: PropTypes.bool,
  onClickEvent: PropTypes.func,
};
