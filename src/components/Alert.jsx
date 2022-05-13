import React from "react";

const Alert = ({ color, msg }) => (
  <div className={`alert alert-${color} text-center`} role="alert">
    {msg}
  </div>
);

export default Alert;
