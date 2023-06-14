import React from "react";
import PropTypes from "prop-types";
import "./stylesheets/Button.css";
import Twemoji from "react-twemoji";

function Button({
    content,
    emoji,
    emojiRight,
    onClick,
}) {
    const emojiElem = (
        <Twemoji className="button-emoji">{emoji}</Twemoji>
    );

    return (
        <button
            className="custom-ui"
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
};

Button.defaultProps = {
    content: "Button",
    emojiRight: false,
    emoji: "❓",
}

export default Button;
