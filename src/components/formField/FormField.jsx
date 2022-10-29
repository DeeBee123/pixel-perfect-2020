import React from "react";
import PropTypes from "prop-types";
import "./form-field.scss";

/*
  FormField is used for creating an input field with an optional label
  above it and an optional p tag for error message below it

  htmlFor = id of input + label attribute htmlFor (required even if labelText is not present)
  labelText = text of the label (if labelText is not present, label is not displayed)
  inputType = type of input
  inputRef = ref of input, used for validating the input when 'Register' button is pressed
  placeholder = placeholder text of the input
                (if placeholder is not present, label will be used as placeholder)
                (if you don't want a placeholder, provide placeholder="" as an attribute)
  validationFunc = function that validates input (if validation is not needed, don't include the attribute)
  setErrorMsg = function that sets the error message in parent component
  errorMsg = if there is an error message - render error styles and the message.
*/

export const FormField = ({
  htmlFor,
  labelText,
  inputType,
  inputRef,
  placeholder,
  validationFunc,
  setErrorMsg,
  errorMsg,
}) => {
  const handleInputChange = () => {
    const result = validationFunc(inputRef);
    setErrorMsg(result);
  };

  const handleInputDelete = () => {
    if (inputRef && inputRef.current) {
      inputRef.current.value = "";
    }
    // validate input after text deletion because the input may require to have text
    handleInputChange();
  };

  return (
    <div className="form__column">
      <div className="form-field">
        {labelText && (
          <label htmlFor={htmlFor} className="form-field__label">
            {labelText}
          </label>
        )}

        <input
          ref={inputRef}
          type={inputType ? inputType : "text"}
          id={htmlFor}
          name={htmlFor}
          placeholder={
            placeholder || placeholder === "" ? placeholder : labelText
          }
          className={
            errorMsg
              ? "form-field__input form-field__input--error"
              : "form-field__input"
          }
          onChange={validationFunc ? () => handleInputChange() : null}
          spellCheck="true"
          aria-invalid={errorMsg ? "true" : "false"}
          aria-describedby={`${htmlFor}-error`}
          aria-required="true"
        />

        {validationFunc && (
          <>
            <button
              className={
                errorMsg
                  ? "form-field__clear-btn form-field__clear-btn--visible"
                  : "form-field__clear-btn"
              }
              onClick={handleInputDelete}
              type="button"
            >
              <span className="sr-only">Clear input</span>
            </button>
            <p
              className={
                errorMsg
                  ? "form-field__error-msg form-field__error-msg--visible"
                  : "form-field__error-msg"
              }
            >
              {errorMsg}
            </p>
          </>
        )}
      </div>
    </div>
  );
};

FormField.propTypes = {
  htmlFor: PropTypes.string,
  labelText: PropTypes.string,
  inputType: PropTypes.string,
  inputRef: PropTypes.object,
  placeholder: PropTypes.string,
  validationFunc: PropTypes.func,
  setErrorMsg: PropTypes.func,
  errorMsg: PropTypes.string,
};
