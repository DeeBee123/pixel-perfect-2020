import React, { useContext, useState } from "react";
import { Helmet } from "react-helmet-async";
import "./reservations.scss";
import {
  Layout,
  Breadcrumbs,
  ReservationCard,
  ReservationSideFilters,
  Pagination,
} from "components";
import { ReservationsSearch } from "features";
import { GlobalContext } from "containers";
import { useLocation } from "react-router-dom";

export const Reservations = () => {
  const { devices, books } = useContext(GlobalContext);
  const location = useLocation();
  const { pathname } = location;
  let path = pathname.split("/").filter((x) => x);
  path = path[path.length - 1];

  const ITEMS_PER_PAGE = 10;
  const allItems = path === "devices" ? devices.deviceList : books.bookList;
  const filterCategories =
    path === "devices" ? devices.filterCategories : books.filterCategories;
  const itemType = path === "devices" ? "device" : "book";

  const [currentPage, setCurrentPage] = useState(1);
  const [mainSearchItems, setMainSearchItems] = useState(allItems);
  const [sideFilterItems, setSideFilterItems] = useState(allItems);

  const getMatchingItems = () => {
    return mainSearchItems.filter((a) =>
      sideFilterItems.find((b) => a.id === b.id)
    );
  };

  // get current posts
  const indexOfLastItem = currentPage * ITEMS_PER_PAGE;
  const indexOfFirstItem = indexOfLastItem - ITEMS_PER_PAGE;
  const currentItems = getMatchingItems().slice(
    indexOfFirstItem,
    indexOfLastItem
  );

  // change page number of search results' list
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const [checkedFilters, setCheckedFilters] = useState(() => {
    const obj = {};
    Object.keys(filterCategories).forEach((type) => (obj[type] = []));
    return obj;
  });

  const searchBySideFilters = (filters) => {
    let newFilteredItems = [...allItems];
    for (const filterType of Object.keys(filters)) {
      if (filters[filterType].length > 0) {
        newFilteredItems = newFilteredItems.filter((item) =>
          filters[filterType].find(
            (filterName) => item[filterType] === filterName.value
          )
        );
      }
    }
    return newFilteredItems;
  };

  const handleFilter = (selectedFilter, filterName) => {
    // update filters
    const newFilters = { ...checkedFilters };
    if (selectedFilter.select) {
      newFilters[filterName].push(selectedFilter);
    } else {
      newFilters[filterName] = newFilters[filterName].filter(
        (item) => item.select
      );
    }

    // filter and update items
    setCheckedFilters(newFilters);
    setSideFilterItems(searchBySideFilters(newFilters));
    setCurrentPage(1);
  };

  const handleClear = (filterName) => {
    // update filter with empty values
    const newFilters = { ...checkedFilters };
    newFilters[filterName] = [];

    // filter and update items
    setCheckedFilters(newFilters);
    setSideFilterItems(searchBySideFilters(newFilters));
    setCurrentPage(1);
  };

  // filter based on search text
  const filterByText = (array, text) => {
    if (text) {
      if (itemType === "device") {
        array = array.filter(
          (item) =>
            item.name?.toLowerCase().includes(text) ||
            item.deviceType?.toLowerCase().includes(text) ||
            item.os?.toLowerCase().includes(text) ||
            item.brand?.toLowerCase().includes(text)
        );
      } else {
        array = array.filter(
          (item) =>
            item.title?.toLowerCase().includes(text) ||
            item.author?.toLowerCase().includes(text) ||
            item.genre?.toLowerCase().includes(text)
        );
      }
    }
    return array;
  };

  /*
    Normalizes date to remove timezone offset.

    The assumption that booked items' dates are defined
    in local timezone is made here.
  */
  const createDateAsUTC = (date) => {
    return new Date(
      Date.UTC(
        date.getFullYear(),
        date.getMonth(),
        date.getDate(),
        date.getHours(),
        date.getMinutes(),
        date.getSeconds()
      )
    );
  };

  // filter based on date
  const filterByDate = (array, date) => {
    return array.filter((item) => {
      if (item.bookedUntil && item.bookedUntil !== "null") {
        const bookedUntilDate = new Date(item.bookedUntil);
        const reservationDate = new Date(createDateAsUTC(date));

        // using ">=" sign means that if bookedUntil date is the same date
        // as reservationDate (for example 2020-02-13 and 2020-02-13), the
        // result gets rendered. Use ">" if this is not wanted.
        return reservationDate >= bookedUntilDate;
      }
      return true;
    });
  };

  // filter based on availability
  const filterByAvailability = (array, date) => {
    if (date) {
      array = filterByDate(array, date);
    } else {
      // if date is passed as null, only keep elements that have bookedUntil as null.
      array = array.filter(
        (item) => !item.bookedUntil || item.bookedUntil === "null"
      );
    }
    return array;
  };

  // filter based on selected main search tags
  const filterByMainTags = (array, tags, date) => {
    for (const key in tags) {
      if (tags[key]) {
        switch (key) {
          case "favorites":
            array = array.filter((item) => item.favourite);
            break;
          case "available":
            array = filterByAvailability(array, date);
            if (itemType === "device") {
              // "quantity" is only present in "device" objects
              array = array.filter((item) => item.quantity);
            }
            break;
          default: // "All" tag is selected so no additional filtering is needed
        }
      }
    }
    return array;
  };

  // filter search results
  const handleMainSearch = (searchText, tags, date) => {
    let results = null;
    results = filterByText(allItems, searchText);
    results = filterByMainTags(results, tags, date);
    setMainSearchItems(results);
    setCurrentPage(1);
  };

  const filteredItems = getMatchingItems();

  return (
    <Layout>
      <Helmet>
        <title>
          {itemType.charAt(0).toUpperCase() + itemType.slice(1)} reservations -
          SFE2G
        </title>
        <meta
          name="description"
          content={`${
            itemType.charAt(0).toUpperCase() + itemType.slice(1)
          } reservations page`}
        />
      </Helmet>
      <div className="reservations">
        <Breadcrumbs />
        <h1 className="page-title page-title--smaller-margin">
          {itemType === "device" ? "Device" : "Book"} Reservations
        </h1>
        <ReservationsSearch handleSearch={handleMainSearch} />
        <div className="reservations__content">
          <ReservationSideFilters
            type={itemType + "s"}
            data={allItems}
            filter={handleFilter}
            handleClear={handleClear}
          />
          {filteredItems.length ? (
            <div className="reservations__cards">
              {currentItems.map((item, index) => (
                <ReservationCard
                  data={item}
                  itemType={itemType}
                  key={`${item.id}-${itemType}-card-${index}`}
                />
              ))}
              <Pagination
                itemsPerPage={ITEMS_PER_PAGE}
                totalItems={filteredItems.length}
                paginate={paginate}
                setCurrentPage={setCurrentPage}
                currentPage={currentPage}
              />
            </div>
          ) : (
            <div className="reservations__container">
              <h2 className="reservations__no-results">
                No {itemType + "s"} matched the search.
              </h2>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};
