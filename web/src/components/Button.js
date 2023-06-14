import React from "react";
import PropTypes from "prop-types";
import "./stylesheets/Button.css";
import Twemoji from "react-twemoji";

function Button({
    content,
    small,
    emoji,
    emojiRight,
    onClick,
}) {
    const emojiElem = (
        <Twemoji className="button-emoji">{emoji}</Twemoji>
    );

    return (
        <button
            className={`custom-ui ${small ? "small" : ""}`}
            onClick={onClick}
        >
            {!emojiRight && emojiElem}
            <span className="button-content">{content}</span>
            {emojiRight && emojiElem}
        </button>
    );
}

Button.propTypes = {
    content: PropTypes.string,
    emoji: PropTypes.string,
    emojiRight: PropTypes.bool,
    onClick: PropTypes.func,
    small: PropTypes.bool,
};

Button.defaultProps = {
    content: "Button",
    emojiRight: false,
    emoji: "❓",
    small: false,
}

export default Button;
