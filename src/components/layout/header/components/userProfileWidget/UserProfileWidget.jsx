import React, { useState } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import "./user-profile-widget.scss";
import { ReactComponent as ArrowDown } from "assets/downwards-arrow.svg";
import { ReactComponent as Settings } from "assets/settings-gear.svg";
import { ReactComponent as LogOut } from "assets/log-out.svg";

export const UserProfileWidget = ({ userName, userImage }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleBlur = (e) => {
    if (isMenuOpen && !e.currentTarget.contains(e.relatedTarget)) {
      toggleMenu();
    }
  };

  return (
    <div className="user-profile-widget" onBlur={handleBlur}>
      <button className="user-profile-widget__button" onClick={toggleMenu}>
        <img
          className="user-profile-widget__button-image"
          alt={userName}
          src={userImage}
        />
        <ArrowDown className="user-profile-widget__button-arrow" />
        <span className="sr-only">User menu</span>
      </button>
      {isMenuOpen && (
        <div className="user-profile-widget__menu" onBlur={handleBlur}>
          <ul className="user-profile-widget__menu-list">
            <li className="user-profile-widget__menu-item">
              <Link
                to="settings"
                className="user-profile-widget__menu-link user-profile-widget__menu-link--with-triangle"
              >
                <Settings className="user-profile-widget__menu-icon" />
                Settings
              </Link>
            </li>
            <li className="user-profile-widget__menu-item">
              <Link to="login" className="user-profile-widget__menu-link">
                <LogOut className="user-profile-widget__menu-icon" />
                Log out
              </Link>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
};

UserProfileWidget.propTypes = {
  userName: PropTypes.string,
  userImage: PropTypes.string,
};
