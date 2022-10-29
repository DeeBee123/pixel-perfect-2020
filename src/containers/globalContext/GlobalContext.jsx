import React, { useState, useEffect, createContext } from "react";
import PropTypes from "prop-types";

const GlobalContext = createContext();

const GlobalContextProvider = ({ children }) => {
  const [data, setData] = useState(null);

  useEffect(() => {
    fetch("http://localhost:3000/db.json")
      .then((res) => res.json())
      .then(
        (result) => setData(result),
        (error) => {
          // eslint-disable-next-line no-console
          console.error(error);
        }
      );
  }, []);

  return (
    data && (
      <GlobalContext.Provider value={data}>{children}</GlobalContext.Provider>
    )
  );
};

GlobalContextProvider.propTypes = {
  children: PropTypes.node,
};

export { GlobalContext, GlobalContextProvider };
