import React from "react";
import PropTypes from "prop-types";
import "./restaurant-information.scss";
import { ReactComponent as WebIcon } from "assets/web.svg";
import { ReactComponent as LocationIcon } from "assets/location.svg";
import { ReactComponent as PhoneIcon } from "assets/phone.svg";
import { ReactComponent as ClockIcon } from "assets/clock.svg";
import { ListItem } from "./components/listItem";
import {
  formatWebsiteName,
  formatOpenHours,
} from "utils/restaurantDataFormatting";

export const RestaurantInformation = ({ data }) => {
  return (
    <section className="restaurant-information">
      <h3 className="restaurant-page-section-title">Information</h3>
      <div className="card restaurant-information__content">
        <ListItem title="Address" description={data.address}>
          <LocationIcon className="restaurant-information__list-icon" />
        </ListItem>
        <div className="restaurant-information__list-item">
          <WebIcon className="restaurant-information__list-icon" />
          <div className="restaurant-information__list-information">
            <p className="restaurant-information__list-label">Website</p>
            <a
              target="_blank"
              rel="noopener noreferrer"
              className="
                restaurant-information__list-description
                restaurant-information__list-link"
              href={data.website}
            >
              {formatWebsiteName(data.website)}
            </a>
          </div>
        </div>
        <div className="restaurant-information__list-item">
          <PhoneIcon className="restaurant-information__list-icon" />
          <div className="restaurant-information__list-information">
            <p className="restaurant-information__list-label">Phone number</p>
            <a
              className="
                restaurant-information__list-description
                restaurant-information__list-link"
              href={`tel:${data.phone.replaceAll(" ", "")}`}
            >
              {data.phone}
            </a>
          </div>
        </div>
        <ListItem
          title="Work hours"
          description={`${data.openingHours[0].days} ${formatOpenHours(
            data.openingHours[0].hours
          )}`}
        >
          <ClockIcon className="restaurant-information__list-icon" />
        </ListItem>
      </div>
    </section>
  );
};

RestaurantInformation.propTypes = {
  data: PropTypes.shape({
    address: PropTypes.string,
    website: PropTypes.string,
    phone: PropTypes.string,
    openingHours: PropTypes.array,
  }),
};
