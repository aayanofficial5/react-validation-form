import React from "react";
import { useLocation } from "react-router-dom";

const Success = () => {
  const { state } = useLocation();
  const form = state?.form;

  if (!form) return <p>No data submitted.</p>;

  return (
    <div className="success-container">
  <h2>Form Submitted Successfully!</h2>
  <ul className="success-list">
    {Object.entries(form).map(([key, value]) => {
      if (key !== "showPassword")
        return (
          <li key={key}>
            <strong>{key.toUpperCase()}:</strong> {value}
          </li>
        );
      return null;
    })}
  </ul>
</div>

  );
};

export default Success;
