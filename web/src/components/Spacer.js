import React from "react";
import PropTypes from "prop-types";

const Spacer = ({ height }) => (
    <div style={{ height: height }} />
);

Spacer.propTypes = {
    height: PropTypes.string,
};

export default Spacer;
