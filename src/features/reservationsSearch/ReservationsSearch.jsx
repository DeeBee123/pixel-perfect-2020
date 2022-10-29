import React, { useRef, useState, useEffect } from "react";
import PropTypes from "prop-types";
import "./reservations-search.scss";
import { SearchTag } from "./components";
import { ReactComponent as SearchIcon } from "assets/magnifying-glass.svg";
import { ReactComponent as SearchXIcon } from "assets/search-x-icon.svg";
import { ReactComponent as CheckedIcon } from "assets/circle-checked.svg";
import { ReactComponent as HeartIcon } from "assets/heart-outlined.svg";
import { ReactComponent as CalendarIcon } from "assets/calendar.svg";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export const ReservationsSearch = ({ handleSearch }) => {
  const [reservationDate, setReservationDate] = useState(null);
  const [isDatepickerFocused, setIsDatepickerFocused] = useState(false);
  const [query, setQuery] = useState("");
  const [filters, setFilters] = useState({
    all: true,
    favorites: false,
    available: false,
  });
  const searchInput = useRef(null);
  const dateInput = useRef(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    handleSearch(
      query
        .toLowerCase()
        .replace(/ +(?= )/g, "")
        .trim(), // filtering out repetitive spaces
      filters,
      reservationDate
    );
  };

  const handleInputDelete = () => {
    if (searchInput?.current) {
      setQuery("");
      searchInput.current.value = "";
      searchInput.current.focus();
    }
  };

  const handleDatepickerOpen = () => {
    if (dateInput?.current) {
      dateInput.current.input.focus();
    }
  };

  const handleDateChange = (date) => {
    setReservationDate(date);

    // toggle tags if date value is added/deleted
    if (dateInput?.current) {
      if (!date) {
        handleFilterTagToggle("available", false);
      } else {
        handleFilterTagToggle("available", true);
      }
    }
  };

  const handleFilterTagToggle = (tagText, isEnabled) => {
    const newFilters = { ...filters };
    newFilters[tagText] = isEnabled;

    if (tagText === "all") {
      // "All" tag is pressed
      newFilters.all = true;
      for (const key in newFilters) {
        if (key !== "all") {
          newFilters[key] = false;
        }
      }
    } else {
      // Other than "All" tag is pressed
      if (isEnabled) {
        // If a tag got enabled, disable "All" tag
        newFilters.all = false;
      }

      // if all tags are disabled and the last tag just got disabled, enable "All" tag
      if (!newFilters.favorites && !newFilters.available) {
        newFilters.all = true;
      }
    }

    // clear datepicker value if "Available" tag gets disabled
    if (tagText === "available" && !isEnabled) {
      setReservationDate(null);
    }

    setFilters(newFilters);
  };

  const createPlaceholder = () => {
    const today = new Date();
    return `${today.getDate()} ${today.toLocaleString("en", {
      month: "long",
    })} ${today.getFullYear()}`;
  };

  const handleClickOutsideDate = (e) => {
    if (!dateInput?.current?.input.contains(e.target)) {
      setIsDatepickerFocused(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutsideDate);
    return () =>
      document.removeEventListener("mousedown", handleClickOutsideDate);
  });

  return (
    <div className="reservations-search">
      <div className="form-component">
        <form
          action="#"
          method="get"
          className="form"
          role="search"
          onSubmit={handleSubmit}
        >
          <div className="form-component__header">
            <h2 className="form-component__title">Search</h2>
            <div className="reservations-search__tags">
              <SearchTag
                text="All"
                className={filters.all ? "search-tag--active" : ""}
                enabled={filters.all}
                clickFunction={handleFilterTagToggle}
              />
              <SearchTag
                text="Favorites"
                className={filters.favorites ? "search-tag--active" : ""}
                enabled={filters.favorites}
                clickFunction={handleFilterTagToggle}
              >
                <HeartIcon className="search-tag__icon search-tag__icon--bigger" />
              </SearchTag>
              <SearchTag
                text="Available"
                className={filters.available ? "search-tag--active" : ""}
                enabled={filters.available}
                clickFunction={handleFilterTagToggle}
              >
                <CheckedIcon className="search-tag__icon" />
              </SearchTag>
            </div>
          </div>
          <div className="reservations-search__form">
            <div className="form__column">
              <div className="form-field reservations-search__input-field">
                <input
                  ref={searchInput}
                  type="text"
                  name="searchText"
                  placeholder="Search"
                  className="form-field__input reservations-search__search-input"
                  onChange={(e) => setQuery(e.target.value)}
                  autoComplete="off"
                />
                <SearchIcon
                  className="reservations-search__search-icon"
                  onClick={() => searchInput.current.focus()}
                />
                <button
                  className="
                    reservations-search__input-icon-right
                    reservations-search__input-icon-right--red-animations"
                  onClick={handleInputDelete}
                  onFocus={() => setIsDatepickerFocused(false)}
                  type="button"
                >
                  <SearchXIcon />
                  <span className="sr-only">Clear search text</span>
                </button>
              </div>
            </div>

            <div className="form__column">
              <div className="form-field">
                <label htmlFor="datepicker-input" className="form-field__label">
                  Reservation date
                </label>
                <div className="reservations-search__input-field">
                  <DatePicker
                    ref={dateInput}
                    selected={reservationDate}
                    name="reservationDate"
                    onChange={(date) => handleDateChange(date)}
                    id="datepicker-input"
                    className={`form-field__input reservations-search__datepicker ${
                      isDatepickerFocused
                        ? "reservations-search__datepicker--active"
                        : ""
                    }`}
                    minDate={new Date()}
                    dateFormat="d MMMM yyyy"
                    autoComplete="off"
                    placeholderText={createPlaceholder()}
                    onCalendarOpen={() => setIsDatepickerFocused(true)}
                  />
                  <CalendarIcon
                    className="reservations-search__input-icon-right"
                    onClick={handleDatepickerOpen}
                  />
                </div>
              </div>
            </div>

            <div className="form__column">
              <button
                type="submit"
                className="btn-large reservations-search__submit"
                onFocus={() => setIsDatepickerFocused(false)}
              >
                <SearchIcon className="reservations-search__submit-icon" />
                Search
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

ReservationsSearch.propTypes = {
  handleSearch: PropTypes.func,
};
