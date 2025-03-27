import React from "react";
import { saveUser, setCurrentUser } from "../utils/authUtils";

const EventControls = ({ user }) => {
  const addEvent = (type) => {
    if (!user) return;
    const updatedUser = { ...user, [type]: user[type] + 1 };
    saveUser(updatedUser);
    setCurrentUser(updatedUser);
  };

  return (
    <div className="event-controls">
      <h2>Event Actions</h2>
      <div className="event-buttons">
        <button className="event-btn participate-btn" onClick={() => addEvent("eventsParticipated")}>
          Participate in Event
        </button>
        <button className="event-btn organize-btn" onClick={() => addEvent("eventsOrganized")}>
          Organize Event
        </button>
        <button className="event-btn volunteer-btn" onClick={() => addEvent("eventsVolunteered")}>
          Volunteer for Event
        </button>
      </div>
    </div>
  );
};

export default EventControls;