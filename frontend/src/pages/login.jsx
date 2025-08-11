import React, { useState } from 'react';
import {Link} from 'react-router-dom';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('author');
  const [securityKey, setSecurityKey] = useState('');

  return (
    <div className="login-container">
      <form className="login-form">
        <h2>Login</h2>

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

        {role === 'admin' || role === 'reviewer'  && (
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

        <Link to="/">
          <button  type="submit">Login</button>
        </Link>
      </form>
      <div className="login-footer">
        <p>
          Don't have an account? <Link to="/signup">Sign Up</Link>
        </p>
        <p>
          Forgot your password? <Link to="/reset-password">Reset Password</Link>
        </p>
      </div>
    </div>
  );
}
