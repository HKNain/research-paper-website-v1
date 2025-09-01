import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";

function Reset_password() {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  const email = location.state?.email;
  const otp = location.state?.otp;

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!password) {
      setError("Passwords do not match!");
      return;
    }

    try {
      const res = await axios.patch("http://localhost:5000/api/auth/changepassword", {
        email,
        password,
      });

      if (res.data.success) {
        setError("");
        navigate("/login");
      } else {
        setError(res.data.message || "Failed to reset password");
      }
    } catch (error) {
      console.log(error);
      setError("Something went wrong");
    }
  };

  return (
    <div className="login-container">
      <form className="login-form" onSubmit={handleSubmit}>
        <h2>Reset Password</h2>
        {error && <p style={{ color: "red" }}>{error}</p>}

        <div className="form-row">
          <label>New Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default Reset_password;
