import React from "react";
import "./reservation-card.scss";
import { RedHeart, RatingStars, CheckInButton } from "components";
import PropTypes from "prop-types";

/*
  itemType: either "device" or "book"
  (itemType can be expanded to use different items)
*/

export const ReservationCard = ({ data, itemType }) => {
  let itemName = "";
  let itemBranding = "";
  let itemSpecificData = null;

  switch (itemType) {
    case "book":
      itemName = data.title;
      itemBranding = data.author !== "-" ? data.author : "";
      itemSpecificData = <RatingStars ratingValue={data.rating?.score} />;
      break;
    default:
      itemName = data.name;
      itemBranding = data.brand;
      itemSpecificData = (
        <p className="reservation-card__quantity">Quantity: {data.quantity}</p>
      );
  }

  const availability = (
    <>
      {(data.bookedUntil && data.bookedUntil !== "null") ||
      (itemType === "device" && !data.quantity) ? (
        <img src={require("assets/item-not-available.png")} alt="" />
      ) : (
        <img src={require("assets/item-available.png")} alt="" />
      )}
      <p className="reservation-card__availability-text">
        {data.bookedUntil && data.bookedUntil !== "null"
          ? `Booked until ${data.bookedUntil.split("-").reverse().join("/")}`
          : itemType === "device" && !data.quantity
          ? "Unavailable"
          : "Available"}
      </p>
    </>
  );

  return (
    <div className="card reservation-card">
      <img
        className="reservation-card__image"
        src={data.image}
        alt={itemName}
      />
      <div className="reservation-card__content">
        <RedHeart
          className="reservation-card__like"
          likedByDefault={data.favourite}
        />
        <p className="reservation-card__brand-name">{itemBranding}</p>
        <h3 className="reservation-card__item-name">{itemName}</h3>
        <div className="reservation-card__availability">{availability}</div>
        <div className="reservation-card__bottom-content">
          {itemSpecificData}
          <div className="reservation-card__actions">
            <button className="reservation-card__view-more">View more</button>
            <CheckInButton buttonText="Book" />
          </div>
        </div>
      </div>
    </div>
  );
};

ReservationCard.propTypes = {
  data: PropTypes.shape({
    name: PropTypes.string,
    title: PropTypes.string,
    brand: PropTypes.string,
    author: PropTypes.string,
    image: PropTypes.string.isRequired,
    quantity: PropTypes.number,
    rating: PropTypes.shape({
      score: PropTypes.number.isRequired,
      userCount: PropTypes.number.isRequired,
    }),
    favourite: PropTypes.bool.isRequired,
    bookedUntil: PropTypes.string,
  }).isRequired,
  itemType: PropTypes.string.isRequired,
};
