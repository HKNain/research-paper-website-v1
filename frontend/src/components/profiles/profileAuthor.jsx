import React, { useState, useEffect } from 'react';
import API from '../../api/axios.js'

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

const data = [
    {
        "S No." : "1",
        "Submission" : "https://.com",
        "Updated At": "8:57pm",
        "Status" : "Accepted"
    },
    {
        "S No." : "2",
        "Submission" : "https://.com",
        "Updated At": "8:58pm",
        "Status" : "Pending"
    },
    {
      "S No." : "2",
      "Submission" : "https://.com",
      "Updated At": "8:58pm",
      "Status" : "Rejected"
  }
]

const Profile = () => {
  const [formData, setFormData] = useState(initialState);
  const [showdata , setshowdata] = useState(false);
  const [selectedrow , setselectedrow] = useState(null);

  // fetching user data from an API
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
      } catch (error) {
        console.error("❌ Error fetching profile:", error);
      }
    };
    fetchProfile();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleToggle = (e) => {
    e.preventDefault();
    setshowdata((prev)=>!prev); // replace with API later
  };

  const handleRowClick = (row)=>{
    setselectedrow(row);
  };

  const closeModal = () => {
    setselectedrow(null); 
  };

  return (
    <div className="signup-container">
      <h2>PROFILE</h2>
      <form className="signup-form">

        {/* Role */}
        <div className="form-group">
          <label>
            Role<span className="required">*</span>
          </label>
          <input
            disabled
            type="text"
            name="role"
            onChange={handleChange}
            value={formData.role}
          />
        </div>

        {/* First Name */}
        <div className="form-group">
          <label>
            First Name<span className="required">*</span>
          </label>
          <input 
          disabled 
          type="text" 
          name="firstName" 
          minLength="6" 
          required 
          onChange={handleChange} 
          value={formData.firstName}
          />
        </div>

        {/* Last Name */}
        <div className="form-group">
          <label>Last Name</label>
          <input 
          disabled  
          type="text" 
          name="lastName" 
          onChange={handleChange}  
          value={formData.lastName}
          />
        </div>

        {/* Email */}
        <div className="form-group">
          <label>
            Email<span className="required">*</span>
          </label>
          <input 
          disabled  
          type="email" 
          name="email" 
          required 
          onChange={handleChange} 
          value={formData.email}
          />
        </div>

        {/* Degree */}
        <div className="form-group">
          <label>Degree</label>
          <input 
          disabled 
          type="text" 
          name="degree" 
          onChange={handleChange} 
          value={formData.degree}
          />
        </div>

        {/* Country */}
        <div className="form-group">
          <label>
            Country<span className="required">*</span>
          </label>
          <input 
          disabled  
          type="text" 
          name="country" 
          required 
          onChange={handleChange}  
          value={formData.country}
          />
        </div>

        {/* Phone Number */}
        <div className="form-group">
          <label>Phone Number</label>
          <input 
          disabled 
          type="text" 
          name="phoneNumber" 
          onChange={handleChange} 
          value={formData.phoneNumber}
          />
        </div>

        {/* College Name */}
        <div className="form-group">
          <label>
            College Name<span className="required">*</span>
          </label>
          <input 
          disabled 
          type="text" 
          name="collegeName" 
          required 
          onChange={handleChange} 
          value={formData.collegeName}
          />
        </div>

        {/* Department */}
        <div className="form-group">
          <label>Department</label>
          <input 
          disabled 
          type="text" 
          name="department" 
          onChange={handleChange}  
          value={formData.department}
          />
        </div>

        <div className="form-submit">
          <button onClick={handleToggle} type="submit">View Submissions</button>
        </div>
      </form>

      {/* Table */}
      {showdata && (
        <div className="grid-table-container">
          <div className="grid-table header">
            <div>S No.</div>
            <div>Submission</div>
            <div>Updated At</div>
            <div>Status</div>
          </div>
          {data.map((row, index) => (
            <div onClick={()=>handleRowClick(row)} style={{cursor: 'pointer'}} className="grid-table" key={index}>
              <div>{row["S No."]}</div>
              <div>
                <a href={row["Submission"]} target="_blank" rel="noopener noreferrer">
                  {row["Submission"]}
                </a>
              </div>
              <div>{row["Updated At"]}</div>
              <div 
                style={{
                  color: row["Status"].toLowerCase() === "accepted" ? "green" 
                        : row["Status"].toLowerCase() === "pending" ? "orange" 
                        : "red",
                }}
              >
                {row["Status"]}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Modal */}
      {selectedrow && (
        <div
          className="modal-overlay"
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: "rgba(0,0,0,0.5)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 999,
          }}
          onClick={closeModal}
        >
          <div
            className="modal-content"
            style={{
              background: "#fff",
              padding: "30px",
              marginTop: "100px",
              borderRadius: "12px",
              minWidth: "600px",
              maxWidth: "800px",
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <h2 style={{ marginBottom: "15px" }}>Submission Details</h2>

            <div
              style={{
                display: "flex",
                gap: "10px",
                flexWrap: "wrap",
                marginTop: "10px",
              }}
            >
              {[
                "email1@example.com",
                "email2@example.com",
                "email3@example.com",
                "email4@example.com",
                "email5@example.com",
              ].map((email, i) => (
                <span
                  key={i}
                  style={{
                    padding: "5px 10px",
                    backgroundColor: "#f2f2f2",
                    borderRadius: "6px",
                    fontSize: "14px",
                  }}
                >
                  {email}
                </span>
              ))}
            </div>

            <div style={{ marginTop: "20px" }}>
              <label
                style={{
                  display: "block",
                  marginBottom: "5px",
                  fontWeight: "bold",
                }}
              >
                Comment:
              </label>
              <textarea
                rows="4"
                style={{
                  width: "100%",
                  padding: "8px",
                  borderRadius: "6px",
                  border: "1px solid #ccc",
                  resize: "none",
                }}
                placeholder="Write your comment here..."
              ></textarea>
            </div>

            <div style={{ marginTop: "15px", textAlign: "right" }}>
              <button
                onClick={closeModal}
                style={{
                  padding: "8px 16px",
                  borderRadius: "6px",
                  background: "#007BFF",
                  color: "#fff",
                  border: "none",
                  cursor: "pointer",
                }}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Profile;
