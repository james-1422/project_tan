import React from "react";

const StatCard = ({ icon, title, value, iconColor }) => {
  return (
    <div className="stat-card">
      <div className="stat-header">
        <i className={`stat-icon ${iconColor}`}>{icon}</i>
        <h2>{title}</h2>
      </div>
      <p className="stat-value">{value}</p>
    </div>
  );
};

export default StatCard;