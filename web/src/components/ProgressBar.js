import React from "react";
import PropTypes from "prop-types";
import "./stylesheets/ProgressBar.css";

function ProgressBar({ progress }) {
    return (
        <div className="progress-bar">
            <div className="progress-bar-inner" style={{ width: `${progress * 100}%` }} />
        </div>
    );
}

ProgressBar.propTypes = {
    progress: PropTypes.number.isRequired,
};

export default ProgressBar;
