import React, { useEffect } from "react";
import { NavLink } from "react-router-dom";

const NotFound = () => {
  useEffect(() => {
    document.title = "Renew Store | 404 Not Found";
  }, []);
  return (
    <div className="container-xxl container-p-y">
      <div className="misc-wrapper">
        <h2 className="mb-2 mx-2">Page Not Found :(</h2>
        <p className="mb-4 mx-2">
          Oops! 😖 The requested URL was not found on this server.
        </p>
        <NavLink to="/" className="btn btn-primary">
          Back to Home
        </NavLink>
        <div className="mt-3">
          <img
            src="http://localhost:3000/components/assets/img/illustrations/page-misc-error-light.png"
            alt="page-misc-error-light"
            width="500"
            className="img-fluid"
            data-app-dark-img="illustrations/page-misc-error-dark.png"
            data-app-light-img="illustrations/page-misc-error-light.png"
          />
        </div>
      </div>
    </div>
  );
};

export default NotFound;
