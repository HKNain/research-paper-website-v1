import React, { useState, useEffect } from "react";
import API from "../../api/axios.js";
import AdminSubmissionsTable from "../adminSubmissionsTable.jsx";

const ProfileAdmin = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    role: "admin",
    title: "",
    degree: "",
    country: "",
    phoneNumber: "",
    collegeName: "",
    department: "",
  });

  const [showSubmissions, setShowSubmissions] = useState(false);

  // Fetch admin profile
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await API.get("/auth/me", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setFormData(res.data);
      } catch (err) {
        console.error("❌ Error fetching profile:", err);
      }
    };
    fetchProfile();
  }, []);

  return (
    <div className="signup-container">
      <h2>PROFILE (Admin)</h2>
      <form className="signup-form">
        {Object.entries({
          Role: formData.role,
          "First Name": formData.firstName,
          "Last Name": formData.lastName,
          Email: formData.email,
          Title: formData.title,
          Degree: formData.degree,
          Country: formData.country,
          "Phone Number": formData.phoneNumber,
          "College Name": formData.collegeName,
          Department: formData.department,
        }).map(([label, value], idx) => (
          <div className="form-group" key={idx}>
            <label>{label}</label>
            <input disabled type="text" value={value || ""} />
          </div>
        ))}

        <div className="form-submit">
          <button
            type="button"
            onClick={() => setShowSubmissions(prev => !prev)}
          >
            {showSubmissions ? "Hide All Submissions" : "View All Submissions"}
          </button>
        </div>
      </form>

      {showSubmissions && <AdminSubmissionsTable />}
    </div>
  );
};

export default ProfileAdmin;
