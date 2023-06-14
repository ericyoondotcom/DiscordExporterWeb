import React from "react";
import PropTypes from "prop-types";
import "./stylesheets/Input.css";

function Input({
    value,
    onChange,
    placeholder
}) {
    return (
        <input
            type="text"
            className="custom-ui"
            value={value}
            onChange={onChange}
            placeholder={placeholder}
        />
    )
}

Input.propTypes = {
    value: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
    placeholder: PropTypes.string
};

export default Input;
