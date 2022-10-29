import React from "react";
import PropTypes from "prop-types";
import "./list-item.scss";

export const ListItem = ({ title, description, children }) => (
  <div className="restaurant-information__list-item">
    {children}
    <div className="restaurant-information__list-information">
      <p className="restaurant-information__list-label">{title}</p>
      <p className="restaurant-information__list-description">{description}</p>
    </div>
  </div>
);

ListItem.propTypes = {
  title: PropTypes.string,
  description: PropTypes.string,
  children: PropTypes.node,
};
