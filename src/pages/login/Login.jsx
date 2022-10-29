import React, { useRef, useState } from "react";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import "../registration/registration.scss";
import { ReactComponent as Logo } from "assets/logo_purple-to-blue-gradient.svg";
import { FormComponent, FormField, ProgressBar } from "components";
import { validateEmail, validateText } from "utils/validation";

export const Login = () => {
  const [isProgressBarVisible, setProgressBarVisible] = useState(false);
  const [progressBarMsg, setProgressBarMsg] = useState("Sending request...");
  const [progressBarStatus, setProgressBarStatus] = useState(0);

  const [emailErrorMessage, setEmailErrorMessage] = useState("");
  const [passwordErrorMessage, setPasswordErrorMessage] = useState("");

  const emailInput = useRef(null);
  const passwordInput = useRef(null);

  const handleSubmit = (e) => {
    e.preventDefault();

    // when form is submitted, validate everything in case it was submitted with empty/invalid inputs.
    setEmailErrorMessage(validateEmail(emailInput));
    setPasswordErrorMessage(validateText(passwordInput));

    if (emailErrorMessage === null && passwordErrorMessage === null) {
      // Valid form.
      setProgressBarVisible(true);

      // First progress status update has to be in setTimeout
      // for transition to happen between 0% and the provided value
      setTimeout(() => {
        setProgressBarStatus(33);
      }, 0);

      setTimeout(() => {
        setProgressBarMsg("Logging in...");
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
        <title>Login - SFE2G</title>
        <meta name="description" content="Login page" />
      </Helmet>
      <div className="registration__content">
        <Logo className="registration__logo" />
        <FormComponent title="Login" subTitle="Welcome back, please login.">
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
                validationFunc={validateText}
                setErrorMsg={setPasswordErrorMessage}
                errorMsg={passwordErrorMessage}
              ></FormField>
            </div>

            <div className="form__actions">
              <button type="submit" className="btn-large">
                Login
              </button>
              <p className="form__link-container">
                Don&apos;t have an account?
                <Link to="/registration" className="form__link">
                  {" "}
                  Sign up
                </Link>
              </p>
            </div>
          </form>
        </FormComponent>
      </div>
    </div>
  );
};
