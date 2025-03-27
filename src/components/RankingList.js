import React from "react";
import { calculatePoints } from "../utils/rankingUtils";

const RankingList = ({ rankedUsers, currentUser }) => {
  return (
    <div className="ranking-list">
      <h2>Ranking List</h2>
      <div className="rankings-container">
        {rankedUsers.length === 0 ? (
          <p className="no-data-message">No users registered yet.</p>
        ) : (
          rankedUsers.map((user, index) => (
            <div key={index} className="ranking-item">
              <div className="ranking-info">
                <span className="rank">#{index + 1}</span>
                <span className="name">{user.fullName}</span>
              </div>
              <span className="points">{calculatePoints(user)} points</span>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default RankingList;