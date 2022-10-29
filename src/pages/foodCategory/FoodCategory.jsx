import React, { useContext } from "react";
import { Helmet } from "react-helmet-async";
import PropTypes from "prop-types";
import "./food-category.scss";
import { Layout, Breadcrumbs, RestaurantCard } from "components";
import { GlobalContext } from "containers";

export const FoodCategory = ({ name }) => {
  const { restaurants } = useContext(GlobalContext);
  const data = restaurants.restaurantList.filter((restaurant) =>
    restaurant.categories.includes(name)
  );

  return (
    <Layout>
      <Helmet>
        <title>Eat-out {name} - SFE2G</title>
        <meta
          name="description"
          content={`Eat-out ${name} food category page`}
        />
      </Helmet>
      <div className="food-category">
        <Breadcrumbs />
        <h1 className="title">The best places for {name.toUpperCase()}!</h1>
        <div className="food-category__grid">
          {data.map((restaurant) => (
            <RestaurantCard
              restaurant={restaurant}
              key={`${name}-restaurant-${restaurant.name}`}
            />
          ))}
        </div>
      </div>
    </Layout>
  );
};

FoodCategory.propTypes = {
  name: PropTypes.string.isRequired,
};
