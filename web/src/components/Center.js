import React from "react";
import "./stylesheets/Center.css";

function Center({ children }) {
    return (
        <div className="center">
            {children}
        </div>
    )
}

export default Center;
