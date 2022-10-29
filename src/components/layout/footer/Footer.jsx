import React from "react";
import "./footer.scss";

export const Footer = () => (
  <footer className="footer">
    <span className="footer__copyright">
      Copyright &copy; {new Date().getFullYear()} DEVBRIDGE
    </span>
  </footer>
);
