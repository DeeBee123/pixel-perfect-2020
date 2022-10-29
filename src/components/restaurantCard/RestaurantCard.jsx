import React from "react";
import "./restaurant-card.scss";
import { RestaurantCardHeader, CheckInButton } from "components";
import { Link } from "react-router-dom";
import { createPathFromString } from "utils/createPathFromString";
import webIcon from "assets/web.svg";
import locationIcon from "assets/location.svg";
import PropTypes from "prop-types";
import { formatWebsiteName } from "utils/restaurantDataFormatting";

export const RestaurantCard = ({ restaurant, onClickEvent }) => {
  return (
    <div className="card restaurant-card">
      <RestaurantCardHeader
        restaurant={restaurant}
        showCheckIns={false}
        onClickEvent={onClickEvent}
      />
      <p className="restaurant-card__info-item">
        <img className="restaurant-card__icon" src={webIcon} alt="web" />
        <a
          target="_blank"
          rel="noopener noreferrer"
          href={restaurant.website}
          className="restaurant-card__link"
        >
          {formatWebsiteName(restaurant.website)}
        </a>
      </p>
      <p className="restaurant-card__info-item">
        <img
          className="restaurant-card__icon"
          src={locationIcon}
          alt="adress"
        />
        {restaurant.address}
      </p>
      <div className="info-container">
        <p className="restaurant-card__description">{restaurant.description}</p>

        <div className="bottom-links-container">
          <Link
            to={`/eatout/${createPathFromString(restaurant.name)}`}
            onClick={onClickEvent}
            className="restaurant-card__read-more"
          >
            read more
          </Link>
          <div className="restaurant-card__check-in ">
            <CheckInButton />
          </div>
        </div>
      </div>
    </div>
  );
};

RestaurantCard.propTypes = {
  onClickEvent: PropTypes.func,
  restaurant: PropTypes.shape({
    name: PropTypes.string,
    website: PropTypes.string,
    address: PropTypes.string,
    description: PropTypes.string,
  }),
};
