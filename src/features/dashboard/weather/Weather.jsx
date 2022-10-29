import React, { useContext } from "react";
import "./weather.scss";
import windIcon from "assets/illustrations/wind.svg";
import dropIcon from "assets/illustrations/water-droplet.svg";
import { GlobalContext } from "containers";

export const Weather = () => {
  const { weather } = useContext(GlobalContext);
  const currentDate = new Intl.DateTimeFormat("en-UK", {
    month: "long",
    day: "numeric",
    weekday: "long",
  })
    .format(new Date())
    .split(/[\s,]+/); // splitting with both commas and spaces

  const currWeather = weather.find(
    (weather) => weather.weekDay === currentDate[0]
  );

  return currWeather ? (
    <div className="weather">
      <div className="weather__content">
        <div className="weather__info">
          <span className="weather__info-text">
            {currentDate[0]}, {currentDate[2]} {currentDate[1]}
          </span>
          <span className="weather__info-text">{currWeather.location}</span>
        </div>
        <div className="weather__data">
          <span className="weather__data__temperature">
            {currWeather.degreesInCelsius.replace("+", "")}&deg;
          </span>
          <span className="weather__data__type">{currWeather.type}</span>
        </div>
        <div className="weather__detail">
          <img className="weather__detail-icon" src={windIcon} alt="wind"></img>
          <span className="weather__detail-text">{currWeather.wind}</span>

          <img className="weather__detail-icon" src={dropIcon} alt="drop"></img>
          <span className="weather__detail-text">
            {currWeather.precipitation}
          </span>
        </div>
      </div>
      <div className="weather__icon-container">
        <img
          className="weather__icon-container__icon"
          src={require(`assets/illustrations/${currWeather.type}.png`)}
          alt={currWeather.type}
        ></img>
      </div>
    </div>
  ) : null;
};
