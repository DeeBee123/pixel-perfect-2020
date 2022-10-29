import React from "react";
import PropTypes from "prop-types";
import "./breadcrumbs.scss";
import { ReactComponent as Separator } from "assets/breadcrumbs-separator.svg";
import { Link } from "react-router-dom";

export const BreadcrumbItem = (props) => {
  return (
    <li>
      <Link className="breadcrumbs__item" to={props.url}>
        {props.name.replaceAll("-", " ")}
      </Link>
      {!props.isCurrent && <Separator className="breadcrumbs__separator" />}
    </li>
  );
};
BreadcrumbItem.propTypes = {
  name: PropTypes.string,
  url: PropTypes.string,
  isCurrent: PropTypes.bool,
};
