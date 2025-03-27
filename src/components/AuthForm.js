import React, { useState } from "react";
import {
  findUserByUsername,
  saveUser,
  validatePassword,
  generateUniqueCode,
  getUsers,
} from "../utils/authUtils";
import { User, Mail, KeyRound, Eye, EyeOff } from "lucide-react";

const AuthForm = ({ onLogin }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    username: "",
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");

    const { username, name, email, password, confirmPassword } = formData;

    if (isLogin) {
      const user = findUserByUsername(username);
      if (!user || user.password !== password) {
        setError(user ? "Incorrect password" : "User not found");
        return;
      }
      onLogin(user);
    } else {
      if (findUserByUsername(username)) {
        setError("Username already exists");
        return;
      }
      if (!name || !email || password !== confirmPassword) {
        setError(
          !name || !email
            ? "Please fill in all fields"
            : "Passwords do not match"
        );
        return;
      }

      // Validate password strength
      const passwordValidationResult = validatePassword(password);
      if (passwordValidationResult !== true) {
        setError(passwordValidationResult); // Display the specific error message
        return;
      }

      const newUser = {
        username,
        name,
        email,
        password,
        uniqueCode: generateUniqueCode(name),
        eventsParticipated: 0,
        eventsOrganized: 0,
        eventsVolunteered: 0,
        ranking: getUsers().length + 1,
      };

      saveUser(newUser);
      onLogin(newUser);
    }
  };

  const toggleAuthMode = () => {
    setIsLogin(!isLogin);
    setFormData({ username: "", name: "", email: "", password: "", confirmPassword: "" });
    setError("");
  };

  return (
    <div id="auth-container" className="container">
      <div className="auth-form">
        <h2 id="form-title">{isLogin ? "Welcome Back" : "Create Account"}</h2>
        <form id="auth-form" onSubmit={handleSubmit}>
          {/* Username Field */}
          <div className="input-group">
            <User className="input-icon" />
            <input
              type="text"
              id="username"
              name="username"
              placeholder="Username"
              value={formData.username}
              onChange={handleInputChange}
              required
            />
          </div>

          {/* Name Field (Only visible in Register mode) */}
          {!isLogin && (
            <div className="input-group">
              <User className="input-icon" />
              <input
                type="text"
                id="name"
                name="name"
                placeholder="Full Name"
                value={formData.name}
                onChange={handleInputChange}
              />
            </div>
          )}

          {/* Email Field (Only visible in Register mode) */}
          {!isLogin && (
            <div className="input-group">
              <Mail className="input-icon" />
              <input
                type="email"
                id="email"
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleInputChange}
              />
            </div>
          )}

          {/* Password Field */}
          <div className="input-group">
            <KeyRound className="input-icon" />
            <input
              type={showPassword ? "text" : "password"}
              id="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleInputChange}
              required
            />
            <button
              type="button"
              className="toggle-password"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <EyeOff className="password-toggle-icon" /> : <Eye className="password-toggle-icon" />}
            </button>
          </div>

          {/* Confirm Password Field (Only visible in Register mode) */}
          {!isLogin && (
            <div className="input-group">
              <KeyRound className="input-icon" />
              <input
                type={showConfirmPassword ? "text" : "password"}
                id="confirm-password"
                name="confirmPassword"
                placeholder="Confirm Password"
                value={formData.confirmPassword}
                onChange={handleInputChange}
              />
              <button
                type="button"
                className="toggle-password"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              >
                {showConfirmPassword ? <EyeOff className="password-toggle-icon" /> : <Eye className="password-toggle-icon" />}
              </button>
            </div>
          )}

          {/* Error Message */}
          <p id="error-message" className="error-message">
            {error}
          </p>

          {/* Submit Button */}
          <button id="submit-button" type="submit" className="submit-btn">
            {isLogin ? "Login" : "Register"}
          </button>
        </form>

        {/* Forgot Password Link (Only visible in Login mode) */}
        {isLogin && (
          <p id="forgot-password" className="text-center">
            <a href="#" className="link">
              Forgot Password?
            </a>
          </p>
        )}

        {/* Toggle Between Login and Register */}
        <p className="text-center">
          <span id="toggle-text">{isLogin ? "Don't have an account? " : "Already have an account? "}</span>
          <a href="#" id="toggle-auth" className="link" onClick={toggleAuthMode}>
            {isLogin ? "Register" : "Login"}
          </a>
        </p>
      </div>
    </div>
  );
};

export default AuthForm;