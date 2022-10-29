import React, { useRef, useState } from "react";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import "./registration.scss";
import { ReactComponent as Logo } from "assets/logo_purple-to-blue-gradient.svg";
import { FormComponent, FormField, ProgressBar } from "components";
import {
  validateText,
  validateEmail,
  validatePassword,
  validatePasswordRepeat,
} from "utils/validation";

export const Registration = () => {
  const [isProgressBarVisible, setProgressBarVisible] = useState(false);
  const [progressBarMsg, setProgressBarMsg] = useState("Sending request...");
  const [progressBarStatus, setProgressBarStatus] = useState(0);

  const [firstNameErrorMessage, setFirstNameErrorMessage] = useState("");
  const [lastNameErrorMessage, setLastNameErrorMessage] = useState("");
  const [emailErrorMessage, setEmailErrorMessage] = useState("");
  const [passwordErrorMessage, setPasswordErrorMessage] = useState("");
  const [passwordRepeatErrorMessage, setPasswordRepeatErrorMessage] = useState(
    ""
  );

  const firstNameInput = useRef(null);
  const lastNameInput = useRef(null);
  const emailInput = useRef(null);
  const passwordInput = useRef(null);
  const passwordRepeatInput = useRef(null);

  const passwordRepeatValidation = (passRepeat) =>
    validatePasswordRepeat(passRepeat, passwordInput);

  const firstPasswordValidation = (pass) => {
    // when entering the first password, the 'REPEAT PASSWORD' is validated too
    const passRepeatErr = passwordRepeatValidation(passwordRepeatInput);
    setPasswordRepeatErrorMessage(passRepeatErr);
    return validatePassword(pass);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // when form is submitted, validate everything in case it was submitted with empty/invalid inputs.
    setFirstNameErrorMessage(validateText(firstNameInput));
    setLastNameErrorMessage(validateText(lastNameInput));
    setEmailErrorMessage(validateEmail(emailInput));
    setPasswordErrorMessage(validatePassword(passwordInput));
    setPasswordRepeatErrorMessage(
      validatePasswordRepeat(passwordRepeatInput, passwordInput)
    );

    if (
      firstNameErrorMessage === null &&
      lastNameErrorMessage === null &&
      emailErrorMessage === null &&
      passwordErrorMessage === null &&
      passwordRepeatErrorMessage === null
    ) {
      // Valid form.
      setProgressBarVisible(true);

      // First progress status update has to be in setTimeout
      // for transition to happen between 0% and the provided value
      setTimeout(() => {
        setProgressBarStatus(33);
      }, 0);

      setTimeout(() => {
        setProgressBarMsg("Registering user...");
        setProgressBarStatus(66);
      }, 1000);

      setTimeout(() => {
        setProgressBarMsg("Redirecting...");
        setProgressBarStatus(100);
      }, 2000);

      setTimeout(() => {
        // redirect
        window.location.href = "/";
      }, 2500);
    }
  };

  return (
    <div className="registration">
      <Helmet>
        <title>Registration - SFE2G</title>
        <meta name="description" content="Registration page" />
      </Helmet>
      <div className="registration__content">
        <Logo className="registration__logo" />
        <FormComponent title="Register" subTitle="Let's get you on board.">
          {isProgressBarVisible && (
            <ProgressBar message={progressBarMsg} status={progressBarStatus} />
          )}
          <form
            action="#"
            method="post"
            className="form"
            onSubmit={handleSubmit}
          >
            <div className="form__row">
              <FormField
                htmlFor="firstName"
                labelText="First Name"
                inputRef={firstNameInput}
                validationFunc={validateText}
                setErrorMsg={setFirstNameErrorMessage}
                errorMsg={firstNameErrorMessage}
              ></FormField>

              <FormField
                htmlFor="lastName"
                labelText="Last Name"
                inputRef={lastNameInput}
                validationFunc={validateText}
                setErrorMsg={setLastNameErrorMessage}
                errorMsg={lastNameErrorMessage}
              ></FormField>
            </div>

            <div className="form__row">
              <FormField
                htmlFor="email"
                labelText="Email"
                inputType="email"
                inputRef={emailInput}
                validationFunc={validateEmail}
                setErrorMsg={setEmailErrorMessage}
                errorMsg={emailErrorMessage}
              ></FormField>
            </div>

            <div className="form__row">
              <FormField
                htmlFor="password"
                labelText="Password"
                inputType="password"
                inputRef={passwordInput}
                validationFunc={firstPasswordValidation}
                setErrorMsg={setPasswordErrorMessage}
                errorMsg={passwordErrorMessage}
              ></FormField>

              <FormField
                htmlFor="passwordRepeat"
                labelText="Repeat Password"
                inputType="password"
                inputRef={passwordRepeatInput}
                validationFunc={passwordRepeatValidation}
                setErrorMsg={setPasswordRepeatErrorMessage}
                errorMsg={passwordRepeatErrorMessage}
              ></FormField>
            </div>

            <div className="form__actions">
              <button type="submit" className="btn-large">
                Register
              </button>
              <p className="form__link-container">
                Already have account?
                <Link to="/login" className="form__link">
                  {" "}
                  Sign in
                </Link>
              </p>
            </div>
          </form>
        </FormComponent>
      </div>
    </div>
  );
};
