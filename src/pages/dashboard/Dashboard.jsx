import React, { useContext } from "react";
import { Helmet } from "react-helmet-async";
import {
  Hello,
  Weather,
  StoriesGrid,
  ReservationsSection,
  EatOutSection,
} from "features";
import { Layout } from "components";
import "./dashboard.scss";
import { GlobalContext } from "containers";

export const Dashboard = () => {
  const { stories } = useContext(GlobalContext);

  return (
    <Layout>
      <Helmet>
        <title>Dashboard - SFE2G</title>
        <meta name="description" content="Dashboard page" />
      </Helmet>
      <div className="dashboard">
        <div className="dashboard__widgets">
          <Hello />
          <Weather />
        </div>
        <ReservationsSection />
        <EatOutSection />
        <StoriesGrid stories={stories} />
      </div>
    </Layout>
  );
};
