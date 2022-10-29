import React from "react";
import PropTypes from "prop-types";
import { ReactComponent as SourceryLogo } from "assets/sourcery-logo.svg";

import "./get-started-list.scss";

export const GetStartedList = ({ instructions }) => (
  <div className="get-started-list">
    <SourceryLogo />
    <h2 className="get-started-list__title">Instructions:</h2>
    <ol className="get-started-list__list">
      {instructions.map((instruction) => (
        <li key={instruction.id} className="get-started-list__list-item">
          {instruction.instruction}
        </li>
      ))}
    </ol>
  </div>
);

GetStartedList.propTypes = {
  instructions: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      instruction: PropTypes.string,
    })
  ),
};
