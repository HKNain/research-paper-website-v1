import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import API from "../api/axios";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("author");
  const [securityKey, setSecurityKey] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault(); // stop page refresh
    setError("");

    try {
      const res = await API.post("/auth/login", {
        email,
        password,
        role,
        securityKey: role === "admin" || role === "reviewer" ? securityKey : undefined
      });

      // If backend sends a token in JSON
      if (res.data.token) {
        localStorage.setItem("token", res.data.token);
      }
      if (res.data.user?.role) {
        localStorage.setItem("role", res.data.user.role);
      }
      console.log("✅ Logged in:", res.data);
      navigate("/profile"); // go to home/dashboard
    } catch (err) {
      console.error("❌ Login error:", err.response?.data || err.message);
      setError(err.response?.data?.error || "Login failed");
    }
  };

  return (
    <div className="login-container">
      <form className="login-form" onSubmit={handleSubmit}>
        <h2>Login</h2>

        {error && <p style={{ color: "red" }}>{error}</p>}

        <div className="form-row">
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div className="form-row">
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <div className="form-row">
          <label>Role:</label>
          <select value={role} onChange={(e) => setRole(e.target.value)}>
            <option value="admin">Admin</option>
            <option value="author">Author</option>
            <option value="reviewer">Reviewer</option>
          </select>
        </div>

        {(role === "admin" || role === "reviewer") && (
          <div className="form-row">
            <label>Security Key:</label>
            <input
              type="text"
              value={securityKey}
              onChange={(e) => setSecurityKey(e.target.value)}
              required
            />
          </div>
        )}

        <button type="submit">Login</button>
      </form>

      <div className="login-footer">
        <p>
          Don't have an account? <Link to="/signup">Sign Up</Link>
        </p>
        <p>
          Forgot your password? <Link to="/existingemail">Reset Password</Link>
        </p>
      </div>
    </div>
  );
}
