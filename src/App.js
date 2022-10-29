import React, { useContext } from "react";
import { HelmetProvider } from "react-helmet-async";
import { Route, BrowserRouter, Switch, Redirect } from "react-router-dom";
import {
  Registration,
  Login,
  Dashboard,
  DbUsageExample,
  EatOut,
  Reservations,
  Restaurant,
  FoodCategory,
} from "pages";
import { ScrollToTop } from "components";
import { GlobalContext } from "containers";
import { createPathFromString } from "utils/createPathFromString";

const App = () => {
  const { restaurants } = useContext(GlobalContext);

  const renderEatoutSubpage = (match) => {
    const linkID = match.params.eatoutID;
    const name = linkID.replace(
      linkID.charAt(0),
      linkID.charAt(0).toUpperCase()
    );
    const isFoodCategory = restaurants.categories.includes(name);

    if (isFoodCategory) {
      return <FoodCategory name={name} />;
    } else {
      let originalRestaurantName = "";
      const isRestaurant = restaurants.restaurantList.some((restaurant) => {
        originalRestaurantName = restaurant.name;
        return (
          createPathFromString(originalRestaurantName) === name.toLowerCase()
        );
      });

      if (isRestaurant) {
        return <Restaurant name={originalRestaurantName} />;
      } else {
        // provided path does not contain data (wrong url)
        return <Redirect to="/404" />;
      }
    }
  };

  return (
    <HelmetProvider>
      <div className="app">
        <BrowserRouter>
          <ScrollToTop />
          <Switch>
            <Route exact path="/">
              <Dashboard />
            </Route>
            <Route path="/login">
              <Login />
            </Route>
            <Route path="/registration">
              <Registration />
            </Route>
            <Route exact path="/reservations">
              <Redirect to="/reservations/devices" />
            </Route>
            <Route path="/reservations">
              <Reservations />
            </Route>
            <Route exact path="/eatout">
              <EatOut />
            </Route>
            <Route
              path="/eatout/:eatoutID"
              render={({ match }) => renderEatoutSubpage(match)}
            />
            <Route path="/instructions">
              <DbUsageExample />
            </Route>
            {/* error (404) page goes at the end of Switch */}
          </Switch>
        </BrowserRouter>
      </div>
    </HelmetProvider>
  );
};

export default App;
