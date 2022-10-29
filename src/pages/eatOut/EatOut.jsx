import React, { useContext } from "react";
import { Helmet } from "react-helmet-async";
import "./eat-out.scss";
import { Layout, Breadcrumbs, RestaurantCardsSlider } from "components";
import { EatOutCategoriesSection, EatOutSlider } from "features";
import { GlobalContext } from "containers";

export const EatOut = () => {
  const { restaurants, userData } = useContext(GlobalContext);
  //creating random array of five restaurants for eatOutSlider
  const restaurantsArray = restaurants.restaurantList;
  const randomRestaurants = [];

  while (randomRestaurants.length < 5) {
    const randomIndex = Math.floor(Math.random() * restaurantsArray.length);
    const isInArray = randomRestaurants.includes(restaurantsArray[randomIndex]);

    if (!isInArray) {
      randomRestaurants.push(restaurantsArray[randomIndex]);
    }
  }

  // for "Discover near you" slider:
  const userLocation = userData.location.split(",")[0];
  const restaurantNearUser = restaurants.restaurantList.filter((restaurant) =>
    restaurant.address.includes(userLocation)
  );

  // for "New places" slider
  const restaurantNewPlaces = restaurants.restaurantList
    .filter(
      (d) =>
        typeof d.dateAdded != "undefined" &&
        d.dateAdded != null &&
        d.dateAdded.length != null &&
        d.dateAdded.length > 0
    )
    .slice() // creates new array to avoid affecting other features because of sort() method
    .sort((a, b) => Date.parse(b.dateAdded) - Date.parse(a.dateAdded))
    .slice(0, 10);

  return (
    <Layout>
      <Helmet>
        <title>Eat-out - SFE2G</title>
        <meta name="description" content="Eat-out page" />
      </Helmet>
      <div className="eatout">
        <Breadcrumbs />
        <h1 className="page-title">Hungry? Find the best place!</h1>
        <EatOutSlider randomRestaurants={randomRestaurants} />
        <EatOutCategoriesSection />
        <RestaurantCardsSlider
          filteredRestaurants={restaurantNearUser}
          title={"Discover near you"}
        />
        <RestaurantCardsSlider
          filteredRestaurants={restaurantNewPlaces}
          title={"New places"}
        />
      </div>
    </Layout>
  );
};
