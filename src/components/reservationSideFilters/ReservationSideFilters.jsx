import React from "react";
import "./reservation-side-filters.scss";
import { ReservationSideFilter } from "./components";
import PropTypes from "prop-types";

export const ReservationSideFilters = ({ type, data, filter, handleClear }) => {
  // Filter types
  let os = [];
  let deviceType = [];
  let brand = [];
  let genres = [];

  const removeDuplicates = (items, key) => {
    const newArray = [];
    items
      .filter(Boolean)
      .map((value) => value[key] && newArray.push(value[key]));
    return [...new Set(newArray)].sort();
  };

  const handleChange = (inputFromChild, filterName) => {
    filter(inputFromChild, filterName);
  };

  const clearTriggered = (filterName) => {
    handleClear(filterName);
  };

  const deviceFilters = () => {
    os = removeDuplicates(data, "os");
    deviceType = removeDuplicates(data, "deviceType");
    brand = removeDuplicates(data, "brand");
  };

  const bookFilters = () => {
    genres = removeDuplicates(data, "genre");
  };

  if (type === "devices") {
    deviceFilters();
  } else {
    bookFilters();
  }

  return (
    <nav className="reservation-side-filters">
      {type === "devices" ? (
        <>
          <ReservationSideFilter
            name="deviceType"
            title="Device type"
            items={deviceType}
            handleChange={handleChange}
            clearTriggered={clearTriggered}
          />
          <ReservationSideFilter
            name="os"
            title="Os"
            items={os}
            handleChange={handleChange}
            clearTriggered={clearTriggered}
          />
          <ReservationSideFilter
            name="brand"
            title="Brand"
            items={brand}
            handleChange={handleChange}
            clearTriggered={clearTriggered}
          />
        </>
      ) : (
        <ReservationSideFilter
          name="genre"
          title="Genres"
          items={genres}
          handleChange={handleChange}
          clearTriggered={clearTriggered}
        />
      )}
    </nav>
  );
};

ReservationSideFilters.propTypes = {
  type: PropTypes.string,
  data: PropTypes.array,
  filter: PropTypes.func,
  handleClear: PropTypes.func,
};
