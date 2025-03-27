import React, { useState, useEffect } from "react";
import AuthForm from "./components/AuthForm";
import Dashboard from "./components/Dashboard";
import {
  getUsers,
  findUserByUsername,
  saveUser,
  setCurrentUser,
  getCurrentUser,
  clearCurrentUser,
} from "./utils/authUtils";

const App = () => {
  const [currentUser, setCurrentUserState] = useState(null);

  useEffect(() => {
    const savedUser = getCurrentUser();
    if (savedUser) {
      setCurrentUserState(savedUser);
    }
  }, []);

  const handleLogin = (user) => {
    setCurrentUser(user);
    setCurrentUserState(user);
  };

  const handleLogout = () => {
    clearCurrentUser();
    setCurrentUserState(null);
  };

  return currentUser ? (
    <Dashboard user={currentUser} onLogout={handleLogout} />
  ) : (
    <AuthForm onLogin={handleLogin} />
  );
};

export default App;