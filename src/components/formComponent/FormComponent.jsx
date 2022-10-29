import React from "react";
import PropTypes from "prop-types";
import "./form-component.scss";

/*
  FormComponent is used as a wrapper component for a form.

  It should have a form as a child + a <ProgressBar> component if it's needed.
  Refer to Registration page component for example of usage

  title = main title of the form (if title is not present, then it's not displayed)
  subTitle = subtitle of the form (if title is not present, then it's not displayed)
*/

export const FormComponent = ({ title, subTitle, children }) => (
  <div className="form-component">
    <div className="form-component__header">
      {title && <h2 className="form-component__title">{title}</h2>}
      {subTitle && <p className="form-component__subtitle">{subTitle}</p>}
    </div>
    {children}
  </div>
);

FormComponent.propTypes = {
  title: PropTypes.string,
  subTitle: PropTypes.string,
  children: PropTypes.node,
};
