import React from "react";
import "./restaurant-page-heading-section.scss";
import { InteractionsBanner } from "components";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

export const RestaurantPageHeadingSection = ({ restaurant }) => {
  return (
    <div>
      <div className="restaurant-page-header">
        <figure className="restaurant-page-header__image-container">
          <img
            className="restaurant-page-header__image"
            src={restaurant.image}
            alt={restaurant.name}
          />
        </figure>
        <div className="restaurant-page-header__categories">
          {restaurant.categories.map((category) => (
            <Link
              to={`/eatout/${category}`}
              key={category}
              className="tag-button restaurant-page-header__category-link"
            >
              {category}
            </Link>
          ))}
        </div>
        <h1 className="restaurant-page-header__title">{restaurant.name}</h1>
      </div>
      <div className="restaurant-page-header__interactions-banner">
        <InteractionsBanner
          reviews={restaurant.reviews}
          checkIns={restaurant.checkIns}
        />
      </div>
    </div>
  );
};

RestaurantPageHeadingSection.propTypes = {
  restaurant: PropTypes.shape({
    name: PropTypes.string,
    categories: PropTypes.array,
    image: PropTypes.string,
    checkIns: PropTypes.number,
    reviews: PropTypes.arrayOf(
      PropTypes.shape({
        rating: PropTypes.number,
      })
    ),
  }),
};
