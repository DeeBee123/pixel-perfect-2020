import React, { useRef, useEffect } from "react";
import PropTypes from "prop-types";
import "./progress-bar.scss";

/*
  ProgressBar is a component used to show form submit progress,
  it overlays the whole box of the parent element, which has to have
  position: relative;
*/

export const ProgressBar = ({ message, status }) => {
  const progressStatus = useRef();

  useEffect(() => {
    progressStatus.current.style.width = `${status}%`;
  }, [status]);

  return (
    <div className="progress-bar">
      <div className="progress-bar__line">
        <div ref={progressStatus} className="progress-bar__progress"></div>
      </div>
      <p className="progress-bar__message">{message}</p>
    </div>
  );
};

ProgressBar.propTypes = {
  message: PropTypes.string,
  status: PropTypes.number,
};
