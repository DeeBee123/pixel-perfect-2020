import React, { useEffect, useRef } from "react";
import PropTypes from "prop-types";
import mapboxgl from "mapbox-gl";
import "./restaurant-location.scss";

/*
  This component uses:
  1. 'Mapbox GL JS' for map rendering: https://docs.mapbox.com/mapbox-gl-js/api/

  2. 'Geoapify Geocoding API' for creating
      geographical coordinates from an address: https://www.geoapify.com/geocoding-api
*/

export const RestaurantLocation = ({ address, restaurantName }) => {
  const MAP_ZOOM_LEVEL = 17;
  const mapContainer = useRef(null);

  useEffect(() => {
    if (mapContainer?.current) {
      var url = new URL("https://api.geoapify.com/v1/geocode/search");
      url.search = new URLSearchParams([
        ["text", `${restaurantName}, ${address}`],
        ["api_key", process.env.REACT_APP_GEOAPIFY_API_KEY],
      ]);
      fetch(url)
        .then((response) => response.json())
        .then((data) => {
          const mapData = [
            data.features[0].properties.lon,
            data.features[0].properties.lat,
          ];

          const map = new mapboxgl.Map({
            container: mapContainer.current,
            // 'style' is using a custom map style created with https://studio.mapbox.com
            style: "mapbox://styles/dmd123/ckj57bm2wd88d19mhdkeug5po",
            center: mapData,
            zoom: MAP_ZOOM_LEVEL,
          });

          // eslint-disable-next-line no-unused-vars
          const marker = new mapboxgl.Marker().setLngLat(mapData).addTo(map);
        })
        // eslint-disable-next-line no-console
        .catch((err) => console.error(err));
    }
  }, [restaurantName, address]);

  mapboxgl.accessToken = process.env.REACT_APP_MAPBOXGL_ACCESS_TOKEN;

  return (
    <section className="restaurant-location">
      <h3 className="restaurant-page-section-title">Location</h3>
      <div className="restaurant-location__map-wrapper">
        <div
          ref={mapContainer}
          className="restaurant-location__map-container"
        ></div>
      </div>
    </section>
  );
};

RestaurantLocation.propTypes = {
  address: PropTypes.string.isRequired,
  restaurantName: PropTypes.string.isRequired,
};
