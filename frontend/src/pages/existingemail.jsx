import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api/axios"; // assuming axios instance is here

function Existingemail() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(""); // clear old errors

    try {
      // 🔹 Call backend API to check if email exists
      const res = await API.post("/api/auth/request-reset", { email });

      if (res.data.success) {
        // ✅ Backend confirms OTP is sent
        navigate("/reset-password", { state: { email } }); 
        // you can pass email to next page using location.state
      } else {
        setError("This email is not registered.");
      }
    } catch (err) {
      setError(err.response?.data?.message || "Something went wrong. Try again.");
    }
  };

  return (
    <div className="login-container">
      <form className="login-form" onSubmit={handleSubmit}>
        <h2>Enter your Registered Email</h2>

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

        <button type="submit">Send OTP</button>
      </form>
    </div>
  );
}

export default Existingemail;
