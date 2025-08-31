import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Reset_password() {
  const [password, setPassword] = useState("");
  const [newpassword, setNewpassword] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState(""); // ✅ Fix: Declare error state
  const navigate = useNavigate();

  const handleSubmit = async(e) => {
   try {
     e.preventDefault();
 
     if (password !== newpassword) {
       setError("Passwords do not match!");
       return;
     }
 
     // If you have API call to reset password, do it here
      const res = await axios.patch("http://localhost:5000/api/auth/changepassword", { email , password });
     console.log(res);
     setError(""); // clear error if successful
     navigate("/login"); // redirect
   } catch (error) {
    console.log(error)
   }
  };

  return (
    <div className="login-container">
      <form className="login-form" onSubmit={handleSubmit}>
        <h2>Reset Password</h2>

        {/* ✅ now error is defined */}
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
          <label>New Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <div className="form-row">
          <label>Confirm Password:</label>
          <input
            type="password"
            value={newpassword}
            onChange={(e) => setNewpassword(e.target.value)}
            required
          />
        </div>

        <button type="submit" onClick={handleSubmit} >Submit</button>
      </form>
    </div>
  );
}

export default Reset_password;
