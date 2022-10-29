import React, { useEffect } from "react";
import PropTypes from "prop-types";
import "./pagination.scss";
import { ReactComponent as Arrow } from "assets/navigation-arrow.svg";
import { ReactComponent as Dots } from "assets/pagination-dots.svg";

export const Pagination = ({
  itemsPerPage,
  totalItems,
  paginate,
  setCurrentPage,
  currentPage,
}) => {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalItems / itemsPerPage); i++) {
    pageNumbers.push(i);
  }

  useEffect(() => {});
  return (
    <nav className="pagination" aria-label="pagination" role="navigation">
      {/* Previous page */}
      <button
        aria-label="Go to Previous page"
        onClick={() => {
          setCurrentPage(currentPage - 1);
          paginate(currentPage - 1);
        }}
        className={
          currentPage > 1
            ? "pagination__item pagination__item--rotated"
            : "pagination__item pagination__item--rotated pagination__item--active"
        }
        disabled={currentPage === 1}
      >
        <Arrow className="pagination__arrow" />
      </button>

      {/* Page before current*/}
      {currentPage > 1 && (
        <button
          aria-label={"Go to page " + String(currentPage - 1)}
          onClick={() => {
            setCurrentPage(currentPage - 1);
            paginate(currentPage - 1);
          }}
          className="pagination__item"
        >
          {currentPage - 1}
        </button>
      )}

      {/* Current page*/}
      {currentPage > 0 && (
        <button
          aria-label={"Page " + String(currentPage)}
          className="pagination__item pagination__current-item"
          disabled
        >
          {currentPage}
        </button>
      )}

      {/* Shows only 2nd page */}
      {currentPage === 1 && pageNumbers.length > 2 && (
        <button
          aria-label={"Go to page " + String(currentPage + 1)}
          onClick={() => {
            setCurrentPage(currentPage + 1);
            paginate(currentPage + 1);
          }}
          className="pagination__item"
        >
          {currentPage + 1}
        </button>
      )}
      {/* Shows "..." */}
      {currentPage < pageNumbers.length - 2 && (
        <button className="pagination__item" disabled>
          <Dots />
        </button>
      )}

      {/* Shows page instead of "..." when needed */}
      {currentPage === pageNumbers.length - 2 && pageNumbers.length > 3 && (
        <button
          aria-label={"Go to page " + String(currentPage + 1)}
          onClick={() => {
            setCurrentPage(currentPage + 1);
            paginate(currentPage + 1);
          }}
          className="pagination__item"
        >
          {currentPage + 1}
        </button>
      )}

      {/* Last page */}
      {currentPage < pageNumbers.length && (
        <button
          aria-label={"Go to page " + String(pageNumbers.length)}
          onClick={() => {
            paginate(pageNumbers[pageNumbers.length - 1]);
            setCurrentPage(pageNumbers.length);
          }}
          className="pagination__item"
        >
          {pageNumbers.length}
        </button>
      )}

      {/* Next page */}
      <button
        onClick={() => {
          setCurrentPage(currentPage + 1);
          paginate(currentPage + 1);
        }}
        className={
          currentPage !== pageNumbers.length
            ? "pagination__item"
            : "pagination__item pagination__item--active"
        }
        disabled={currentPage === pageNumbers.length}
      >
        <Arrow className="pagination__arrow" />
      </button>
    </nav>
  );
};

Pagination.propTypes = {
  itemsPerPage: PropTypes.number,
  totalItems: PropTypes.number,
  currentPage: PropTypes.number,
  paginate: PropTypes.func,
  setCurrentPage: PropTypes.func,
  setItems: PropTypes.number,
};
