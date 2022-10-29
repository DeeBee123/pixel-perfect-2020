import React, { useState } from "react";
import PropTypes from "prop-types";
import "./red-heart.scss";
import { ReactComponent as HeartOutlinedSVG } from "assets/heart-outlined.svg";

/*
  className = any additional classes you want to put on the button
  onClick = any additional functionality you want to give on button click
*/

export const RedHeart = ({ className, onClick, likedByDefault = false }) => {
  const [liked, setLiked] = useState(likedByDefault);

  const handleLike = () => {
    if (onClick) {
      onClick(!liked);
    }
    setLiked(!liked);
  };

  return (
    <button
      className={`${className ? className : ""} svg-button svg-button--scale`}
      onClick={handleLike}
    >
      <HeartOutlinedSVG
        className={liked ? `red-heart red-heart--liked` : `red-heart`}
      />
      <span className="sr-only">Like</span>
    </button>
  );
};

RedHeart.propTypes = {
  className: PropTypes.string,
  onClick: PropTypes.func,
  likedByDefault: PropTypes.bool,
};
