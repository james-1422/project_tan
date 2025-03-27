import React, { useEffect } from "react";
import { calculateRanking, calculatePoints } from "../utils/authUtils";
import "./EventControls";
import "./RankingList";
// import { calculateRanking, calculatePoints } from "../utils/rankingUtils";
import { Trophy, Calendar, Crown, HeartHandshake, PlusCircle } from "lucide-react";

const Dashboard = ({ user, onLogout }) => {
  useEffect(() => {
    updateRankingsList();
  }, []);

  const updateRankingsList = () => {
    const rankedUsers = calculateRanking();
    const rankingsContainer = document.getElementById("rankings-container");
    rankingsContainer.innerHTML = "";
    if (rankedUsers.length === 0) {
      rankingsContainer.innerHTML = '<p class="no-data-message">No users registered yet.</p>';
      return;
    }
    rankedUsers.forEach((user, index) => {
      const rankingItem = document.createElement("div");
      rankingItem.className = "ranking-item";
      rankingItem.innerHTML = `
        <div class="ranking-info">
          <span class="rank">#${index + 1}</span>
          <span class="name">${user.fullName}</span>
        </div>
        <span class="points">${calculatePoints(user)} points</span>
      `;
      if (user.username === user.username) {
        rankingItem.style.backgroundColor = "#e0f2fe";
        rankingItem.style.borderLeft = "4px solid #3b82f6";
      }
      rankingsContainer.appendChild(rankingItem);
    });
  };

  const addEventParticipation = () => {
    user.eventsParticipated += 1;
    document.getElementById("events-participated").textContent = user.eventsParticipated;
    updateRankingsList();
  };

  const addEventOrganized = () => {
    user.eventsOrganized += 1;
    document.getElementById("events-organized").textContent = user.eventsOrganized;
    updateRankingsList();
  };

  const addEventVolunteered = () => {
    user.eventsVolunteered += 1;
    document.getElementById("events-volunteered").textContent = user.eventsVolunteered;
    updateRankingsList();
  };

  return (
    <div id="dashboard" className="dashboard">
      <div className="dashboard-header">
        <div className="header-content">
          <div>
            <h1 id="welcome-message">Welcome, {user.fullName}</h1>
            <p id="unique-code">Unique Code: {user.uniqueCode}</p>
          </div>
          <div className="user-actions">
            <span className="user-email" id="user-email">
              {user.email}
            </span>
            <button id="logout-btn" className="logout-btn" onClick={onLogout}>
              Logout
            </button>
          </div>
        </div>
      </div>
      <div className="dashboard-content">
        <div className="stats-grid">
          <div className="stat-card">
            <div className="stat-header">
              <Trophy className="stat-icon yellow" />
              <h2>Ranking</h2>
            </div>
            <p id="ranking" className="stat-value">
              #{user.ranking}
            </p>
          </div>
          <div className="stat-card">
            <div className="stat-header">
              <Calendar className="stat-icon blue" />
              <h2>Events Participated</h2>
            </div>
            <p id="events-participated" className="stat-value">
              {user.eventsParticipated}
            </p>
          </div>
          <div className="stat-card">
            <div className="stat-header">
              <Crown className="stat-icon purple" />
              <h2>Events Organized</h2>
            </div>
            <p id="events-organized" className="stat-value">
              {user.eventsOrganized}
            </p>
          </div>
          <div className="stat-card">
            <div className="stat-header">
              <HeartHandshake className="stat-icon green" />
              <h2>Events Volunteered</h2>
            </div>
            <p id="events-volunteered" className="stat-value">
              {user.eventsVolunteered}
            </p>
          </div>
        </div>
        <div className="event-controls">
          <h2>Event Actions</h2>
          <div className="event-buttons">
            <button
              className="event-btn participate-btn"
              onClick={addEventParticipation}
            >
              <PlusCircle className="event-icon" />
              Participate in Event
            </button>
            <button className="event-btn organize-btn" onClick={addEventOrganized}>
              <PlusCircle className="event-icon" />
              Organize Event
            </button>
            <button
              className="event-btn volunteer-btn"
              onClick={addEventVolunteered}
            >
              <PlusCircle className="event-icon" />
              Volunteer for Event
            </button>
          </div>
        </div>
        <div className="ranking-list">
          <h2>Ranking List</h2>
          <div id="rankings-container" className="rankings-container"></div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;