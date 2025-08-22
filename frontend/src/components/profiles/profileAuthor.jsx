import React, { useState, useEffect } from 'react';
import API from '../../api/axios.js';
import SubmissionsTable from '../submissionsTable.jsx';

const initialState = {
  firstName: '',
  lastName: '',
  email: '',
  title: '',
  degree: '',
  country: '',
  phoneNumber: '',
  role: '',
  collegeName: '',
  department: '',
};


const ProfileAuthor = () => {
  const [formData, setFormData] = useState(initialState);
  const [showData, setShowData] = useState(false);
  const [papers, setPapers] = useState([]);

  // Fetch user profile
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem('token');
        const res = await API.get("/auth/me", {
          headers: { Authorization: `Bearer ${token}` }
        });
        setFormData(prev => ({
          ...prev,
          ...res.data
        }));
  
        // handle research papers safely
        const uploads = res.data.researchPapers?.flatMap(paper =>
          paper.researchPaperUploads?.map(upload => ({ ...upload })) || []
        ) || [];
  
        setPapers(uploads); // you'll need a `papers` state
      } catch (error) {
        console.error("❌ Error fetching profile:", error);
      }
    };
    fetchProfile();
  }, []);
  

  const handleToggle = (e) => {
    e.preventDefault();
    setShowData((prev)=>!prev); // replace with API later
  };

  return (
    <div className="signup-container">
      <h2>PROFILE (Author)</h2>
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
          Department: formData.department
        }).map(([label, value], idx) => (
          <div className="form-group" key={idx}>
            <label>{label}</label>
            <input disabled type="text" value={value} />
          </div>
        ))}

        <div className="form-submit">
          <button onClick={handleToggle} type="button">
            {showData ? "Hide Submissions" : "View Submissions"}
          </button> 
        </div>
      </form>

      {showData && <SubmissionsTable papers={papers} />}

    </div>
  );
};

export default ProfileAuthor;
