import React, { useState, useEffect } from "react";
import API from "../../api/axios.js";
import SubmissionsTable from "../submissionsTable.jsx";
import ReviewerTasks from "../reviewerTasksTable.jsx"; // new component

const initialState = {
  firstName: "",
  lastName: "",
  email: "",
  title: "",
  degree: "",
  country: "",
  phoneNumber: "",
  role: "",
  collegeName: "",
  department: "",
};

const ProfileReviewer = () => {
  const [formData, setFormData] = useState(initialState);
  const [showSubmissions, setShowSubmissions] = useState(false);
  const [showTasks, setShowTasks] = useState(false);
  const [papers, setPapers] = useState([]);

  // Fetch user profile
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await API.get("/auth/me", {
          headers: { Authorization: `Bearer ${token}` },
        });

        setFormData((prev) => ({
          ...prev,
          ...res.data,
        }));

        // collect submissions (like author)
        const uploads =
          res.data.researchPapers?.flatMap(
            (paper) => paper.researchPaperUploads?.map((upload) => ({ ...upload })) || []
          ) || [];

        setPapers(uploads);
      } catch (error) {
        console.error("❌ Error fetching profile:", error);
      }
    };
    fetchProfile();
  }, []);

  return (
    <div className="signup-container">
      <h2>PROFILE (Reviewer)</h2>
      <form className="signup-form">
        {Object.entries({
          Role: formData.role,
          "First Name": formData.firstName,
          "Last Name": formData.lastName,
          Email: formData.email,
          Degree: formData.degree,
          Country: formData.country,
          "Phone Number": formData.phoneNumber,
          "College Name": formData.collegeName,
          Department: formData.department,
        }).map(([label, value], idx) => (
          <div className="form-group" key={idx}>
            <label>{label}</label>
            <input disabled type="text" value={value} />
          </div>
        ))}

        <div className="form-submit">
          <button
            type="button"
            onClick={() => {
              setShowSubmissions((prev) => !prev);
              setShowTasks(false); // close tasks if open
            }}
          >
            {showSubmissions ? "Hide Submissions" : "View Submissions"}
          </button>

          <button
            type="button"
            onClick={() => {
              setShowTasks((prev) => !prev);
              setShowSubmissions(false); // close submissions if open
            }}
          >
            {showTasks ? "Hide Tasks" : "Show Tasks"}
          </button>
        </div>
      </form>

      {/* Submissions (own papers) */}
      {showSubmissions && <SubmissionsTable papers={papers} />}

      {/* Tasks (assigned by admin to review) */}
      {showTasks && <ReviewerTasks reviewerEmail={formData.email} />}
    </div>
  );
};

export default ProfileReviewer;
