import React from "react";
import PropTypes from "prop-types";

const Header = ({ title, subTitle }) => (
  <header className="header mb-3">
    <div>
      <h5 className="portlet__title">{title}</h5>
      <p className="secondary-text">{subTitle}</p>
    </div>
  </header>
);

Header.propTypes = {
  title: PropTypes.string,
  subTitle: PropTypes.string,
};
export default Header;
