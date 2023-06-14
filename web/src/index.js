import React from "react";
import ReactDOM from "react-dom/client";
import "./shared.css";
import ExportPage from "./components/ExportPage";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
	<React.StrictMode>
		<ExportPage />
	</React.StrictMode>
);
