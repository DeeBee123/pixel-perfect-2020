import React, { useContext } from "react";
import { Helmet } from "react-helmet-async";
import PropTypes from "prop-types";
import "./restaurant.scss";
import { Layout, Breadcrumbs, RestaurantCardsSlider } from "components";
import {
  RestaurantInformation,
  RestaurantLocation,
  RestaurantPageHeadingSection,
  ReviewSection,
} from "features";
import { GlobalContext } from "containers";

export const Restaurant = ({ name }) => {
  const { restaurants } = useContext(GlobalContext);
  const data = restaurants.restaurantList.find(
    (restaurant) => restaurant.name === name
  );

  // for "You could also like" slider
  const restaurantSameCategory = restaurants.restaurantList
    .filter((restaurant) => restaurant !== data)
    .filter((category) =>
      category.categories.some((i) => data.categories.includes(i))
    );

  return (
    <Layout>
      <Helmet>
        <title>{data.name} - SFE2G</title>
        <meta name="description" content={`${data.name} reservations page`} />
      </Helmet>
      <div className="restaurant">
        <Breadcrumbs />
        <RestaurantPageHeadingSection restaurant={data} />
        <main className="restaurant__content">
          <article className="restaurant__information">
            <RestaurantInformation data={data} />
            <RestaurantLocation
              address={data.address}
              restaurantName={data.name}
            />
          </article>
          <aside className="restaurant__aside">
            <ReviewSection reviews={data.reviews.slice(0, 3)} />
          </aside>
        </main>
        <RestaurantCardsSlider
          filteredRestaurants={restaurantSameCategory}
          title={"You could also like"}
        />
      </div>
    </Layout>
  );
};

Restaurant.propTypes = {
  name: PropTypes.string.isRequired,
};
