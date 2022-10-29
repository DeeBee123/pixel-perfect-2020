import React from "react";
import "./breadcrumbs.scss";
import { BreadcrumbItem } from "./BreadcrumbItem";
import { ReactComponent as Separator } from "assets/breadcrumbs-separator.svg";
import { useLocation, Link } from "react-router-dom";

export const Breadcrumbs = () => {
  const location = useLocation();
  const { pathname } = location;
  const pathnames = pathname.split("/").filter((x) => x);

  return (
    <nav aria-label="breadcrumbs">
      <ul className="breadcrumbs__list">
        {pathnames.length > 0 ? (
          <li>
            <Link className="breadcrumbs__item" to="/">
              Dashboard
            </Link>
            <Separator className="breadcrumbs__separator" />
          </li>
        ) : (
          <li>
            <Link className="breadcrumbs__item">Dashboard</Link>
          </li>
        )}
        {pathnames.map((name, index) => {
          const routeTo = `/${pathnames.slice(0, index + 1).join("/")}`;
          const isCurrent = pathnames.length - 1 === index;
          return (
            <BreadcrumbItem
              name={name}
              url={routeTo}
              isCurrent={isCurrent}
              key={`breadcrumb-${name}`}
            ></BreadcrumbItem>
          );
        })}
      </ul>
    </nav>
  );
};
