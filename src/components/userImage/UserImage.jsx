import React from "react";
import PropTypes from "prop-types";
import { ReactComponent as PersonSVG } from "assets/person.svg";

export const UserImage = ({ className, userName, userImage }) =>
  userImage && userName ? (
    <img className={className} src={userImage} alt={userName} />
  ) : (
    <PersonSVG className={className} />
  );

UserImage.propTypes = {
  className: PropTypes.string,
  userName: PropTypes.string,
  userImage: PropTypes.string,
};
