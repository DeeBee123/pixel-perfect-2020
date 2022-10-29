import React from "react";
import "./counter-box.scss";
import PropTypes from "prop-types";

export const CounterBox = ({ value, icon, invertedColors, altTag }) => {
  return (
    <div
      className={
        invertedColors ? "counter-box counter-box--inverted" : "counter-box"
      }
    >
      <img className="counter-box__icon" src={icon} alt={altTag} />
      <span className="counter-box__count">{value === -1 ? "-" : value}</span>
    </div>
  );
};

CounterBox.propTypes = {
  value: PropTypes.number,
  icon: PropTypes.string,
  invertedColors: PropTypes.bool,
  altTag: PropTypes.string,
};
