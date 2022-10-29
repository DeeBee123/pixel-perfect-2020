import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import "./category-card.scss";

export const CategoryCard = ({ subTitle, data }) => (
  <Link
    tabIndex={data.link !== "#" ? "0" : "-1"}
    to={data.link}
    className={
      data.link !== "#"
        ? "category-card"
        : "category-card category-card--disabled"
    }
  >
    <div className="category-card__text-container">
      <h2 className="category-card__title">{data.title}</h2>
      <p className="category-card__reserved-count">
        {data.reserved} {subTitle}
      </p>
    </div>
    <figure className="category-card__image-container">
      <img src={data.image} className="category-card__image" alt={data.title} />
    </figure>
  </Link>
);

CategoryCard.propTypes = {
  data: PropTypes.object,
  subTitle: PropTypes.string,
};
