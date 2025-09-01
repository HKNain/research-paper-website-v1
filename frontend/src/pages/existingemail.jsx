import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api/axios"; 

function Existingemail() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(""); 

    try {
    const res = await API.post("/auth/request-reset", { email });
      if (res.data.success) {
        navigate("/verify-otp", { state: { email } }); 
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

        <button type="submit" onSubmit={handleSubmit}>Send OTP</button>
      </form>
    </div>
  );
}

export default Existingemail;
