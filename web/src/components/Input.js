import React from "react";
import PropTypes from "prop-types";
import "./stylesheets/Input.css";

function Input({
    type,
    small,
    value,
    onChange,
    placeholder
}) {
    return (
        <input
            type={type}
            className={`custom-ui ${small ? "small" : ""}`}
            value={value}
            onChange={onChange}
            placeholder={placeholder}
        />
    )
}

Input.propTypes = {
    type: PropTypes.string,
    small: PropTypes.bool,
    value: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
    placeholder: PropTypes.string
};

Input.defaultProps = {
    type: "text",
    small: false,
};

export default Input;
