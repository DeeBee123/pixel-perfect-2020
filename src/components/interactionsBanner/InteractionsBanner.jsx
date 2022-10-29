import React, { useState } from "react";
import "./interactions-banner.scss";
import { RedHeart, RatingStars, CheckInButton } from "components";
import PropTypes from "prop-types";

export const InteractionsBanner = ({ reviews, checkIns }) => {
  const [checkedIn, setCheckedIn] = useState(false);
  const [checkInCount, setCheckInCount] = useState(checkIns || 0);

  const handleCheckIn = () => {
    if (checkedIn) {
      setCheckInCount(checkInCount - 1);
    } else {
      setCheckInCount(checkInCount + 1);
    }
    setCheckedIn(!checkedIn);
  };

  return (
    <div className="interactions-banner card">
      <div className="interactions-banner__item">
        <div className="interactions-banner__rating-stars">
          <RatingStars reviews={reviews} />
        </div>
        <RedHeart />
      </div>
      <p className="interactions-banner__check-in-text">
        {checkInCount + checkIns !== 0
          ? `${checkInCount + checkIns} people already checked-in!`
          : `Be the first to check in!`}
      </p>
      <div className="interactions-banner__item">
        <button className="interactions-banner__invite">invite</button>
        <CheckInButton handleCounter={handleCheckIn} withCounter={true} />
      </div>
    </div>
  );
};

InteractionsBanner.propTypes = {
  reviews: PropTypes.array,
  checkIns: PropTypes.number,
};
