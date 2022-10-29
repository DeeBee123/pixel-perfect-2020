import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import "./navbar.scss";
import { ReactComponent as TSlogo } from "assets/logo-no-color.svg";
import { ReactComponent as TStext } from "assets/logo-text.svg";
import { ReactComponent as SVGbook } from "assets/navigation-booking.svg";
import { ReactComponent as SVGarrow } from "assets/navigation-arrow.svg";
import { ReactComponent as SVGhome } from "assets/navigation-home.svg";
import { ReactComponent as SVGcompass } from "assets/navigation-compass.svg";

export const Navbar = () => {
  const [isExpanded, setExpanded] = useState(false);
  const [isOpened, setOpened] = useState(false);
  const isTouchDevice =
    typeof document !== "undefined" &&
    "ontouchstart" in document.documentElement;

  return (
    <nav
      className={`navbar
      ${isExpanded && "navbar--expanded"}
      ${isOpened && "navbar--expanded"}`}
      onMouseEnter={() => !isTouchDevice && setOpened(true)}
      onMouseLeave={() => !isTouchDevice && setOpened(false)}
    >
      <NavLink to="/" exact className="navbar__logo-container">
        <TSlogo className="navbar__logo" />
        <TStext className="navbar__logo-text" />
      </NavLink>
      <div className="navbar__btn">
        <button
          type="button"
          className="navbar__btn-circle"
          onClick={() => setExpanded(!isExpanded)}
        >
          <SVGarrow className="navbar__btn-toggle" />
        </button>
      </div>
      <ul className="navbar__nav">
        <li className="navbar__item">
          <NavLink
            to="/"
            exact
            className="navbar__link"
            activeClassName="navbar-active"
          >
            <SVGhome className="navbar__link-svg" />
            <span className="navbar__link-text">Dashboard</span>
          </NavLink>
        </li>
        <li className="navbar__item">
          <NavLink
            to="/reservations"
            className="navbar__link"
            activeClassName="navbar-active"
          >
            <SVGbook className="navbar__link-svg" />
            <span className="navbar__link-text">Reservations</span>
          </NavLink>
        </li>
        <li className="navbar__item">
          <NavLink
            to="/eatout"
            className="navbar__link"
            activeClassName="navbar-active"
          >
            <SVGcompass className="navbar__link-svg" />
            <span className="navbar__link-text">Eat‑Out</span>
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};
