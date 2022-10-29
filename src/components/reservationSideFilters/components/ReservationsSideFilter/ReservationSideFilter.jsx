import React, { useState } from "react";
import "./filter.scss";
import PropTypes from "prop-types";
import { ReactComponent as ClearIcon } from "assets/reservations-x.svg";

export const ReservationSideFilter = ({
  title,
  items,
  handleChange,
  clearTriggered,
  name,
}) => {
  const [filtersState, setFiltersState] = useState(
    items.map((data, index) => ({
      select: false,
      value: data,
      id: index,
    }))
  );

  const clearChecks = () => {
    setFiltersState(
      filtersState.map((filter) => {
        filter.select = false;
        return filter;
      })
    );
    clearTriggered(name);
  };

  const addChecks = (value, checked) => {
    const newFilters = [...filtersState];
    newFilters[value.id].select = checked;
    setFiltersState(newFilters);
    handleChange(value, name);
  };

  return (
    <div className="filter">
      <div className="filter__header">
        <span className="filter__header-title">{title}</span>
        <button onClick={clearChecks} className="filter__header-button">
          Clear all <ClearIcon className="filter__header-clear-icon" />
        </button>
      </div>
      <div className="filter__body">
        {filtersState.map((item, index) => (
          <div
            className="filter__body-items"
            key={`checkbox-container-${item.value}-${index}`}
          >
            <input
              id={`checkbox-input-${item.value.replaceAll(" ", "-")}`}
              type="checkbox"
              className="filter__body-checkbox"
              checked={item.select}
              onChange={(e) => {
                addChecks(item, e.target.checked);
              }}
              onKeyUp={(e) => {
                if (e.key === "Enter") {
                  e.target.checked = !e.target.checked;
                  addChecks(item, e.target.checked);
                }
              }}
            />
            <label
              htmlFor={`checkbox-input-${item.value.replaceAll(" ", "-")}`}
              className="filter__body-item-value"
            >
              {item.value}
            </label>
          </div>
        ))}
      </div>
    </div>
  );
};

ReservationSideFilter.propTypes = {
  title: PropTypes.string,
  name: PropTypes.string,
  items: PropTypes.array,
  handleChange: PropTypes.func,
  clearTriggered: PropTypes.func,
};
