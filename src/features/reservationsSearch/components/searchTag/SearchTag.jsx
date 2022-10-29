import React, { useRef, useState } from "react";
import PropTypes from "prop-types";
import "./search-tag.scss";

export const SearchTag = ({
  text,
  clickFunction,
  enabled,
  className,
  children,
}) => {
  const buttonRef = useRef(null);
  const [isEnabled, setIsEnabled] = useState(enabled);

  const handleClick = () => {
    if (buttonRef?.current) {
      setIsEnabled(!isEnabled);
      clickFunction(text.toLowerCase(), !isEnabled);
    }
  };

  /*
      The following is done to force state change in a specific situation
      when internal SearchTag state differs from the one provided.

      *The process of how this happens:
      1. Once this filter gets activated, its state gets updated
         and a filter called "All" gets disabled.
      2. If filter called "All" gets activated, it automatically
         disables all other filters, but only in container state.
      3. Internal state of this now disabled filter is opposite of
         container filter state because this internal state didn't get updated.
  */
  if (isEnabled !== enabled) {
    setIsEnabled(enabled);
  }

  return (
    <button
      ref={buttonRef}
      className={`tag-button search-tag ${className}`}
      type="button"
      onClick={text === "All" && isEnabled ? null : handleClick}
    >
      {children}
      {text}
    </button>
  );
};

SearchTag.propTypes = {
  text: PropTypes.string,
  className: PropTypes.string,
  enabled: PropTypes.any,
  clickFunction: PropTypes.func,
  children: PropTypes.node,
};
