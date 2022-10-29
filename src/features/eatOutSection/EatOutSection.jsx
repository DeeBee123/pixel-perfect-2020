import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { RestaurantCardHeader } from "components";
import "./eat-out-section.scss";
import { GlobalContext } from "containers";

export const EatOutSection = () => {
  const { restaurants } = useContext(GlobalContext);

  return (
    <section className="eat-out">
      <div className="card card--no-shadow eat-out__card">
        <h2 className="eat-out__card-title">
          View all your favourite lunch spots and more
        </h2>
        <Link to="/eatout" className="btn-medium">
          browse list
        </Link>
      </div>
      {restaurants.restaurantList
        .map((restaurant) => (
          <div className="card" key={`eatout-section-${restaurant.id}`}>
            <RestaurantCardHeader restaurant={restaurant} showCheckIns={true} />
          </div>
        ))
        .slice(0, 2)}
    </section>
  );
};
