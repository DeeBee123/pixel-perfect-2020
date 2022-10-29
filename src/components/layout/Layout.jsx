import React from "react";
import PropTypes from "prop-types";
import { Header } from "./header/Header";
import { Footer } from "./footer";
import { Navbar } from "components";
import "./layout.scss";

export const Layout = ({ children }) => {
  return (
    <>
      <Navbar />
      <Header />
      <main className="main-body">{children}</main>
      <Footer />
    </>
  );
};

Layout.propTypes = {
  children: PropTypes.node.isRequired,
};
