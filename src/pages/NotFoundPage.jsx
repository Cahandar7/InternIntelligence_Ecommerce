import React from "react";
import { Link } from "react-router-dom";

const NotFoundPage = () => {
  return (
    <div className="not-found-container page">
      <h1 className="not-found-title">Page Not Found</h1>
      <p className="not-found-message">
        It looks like nothing was found at this location. Try searching or click
        below to go back home.
      </p>
      <Link to={"/"} className="not-found-btn">
        Back to Home
      </Link>
    </div>
  );
};

export default NotFoundPage;
