import React, { useState } from "react";
import PropTypes from "prop-types";

export const CheckInButton = ({
  buttonText = "check-in",
  handleCounter,
  withCounter = false,
}) => {
  const [checkIn, setCheckIn] = useState(true);

  const handleClicks = () => {
    if (withCounter) {
      handleCounter();
    }
    setCheckIn(!checkIn);
  };

  return checkIn ? (
    <button onClick={handleClicks} className="btn-medium">
      {buttonText}
    </button>
  ) : (
    <button onClick={handleClicks} className="btn-medium btn-medium--red">
      cancel
    </button>
  );
};

// add only for alternative buttons or count
CheckInButton.propTypes = {
  buttonText: PropTypes.string,
  handleCounter: PropTypes.func,
  withCounter: PropTypes.bool,
};
