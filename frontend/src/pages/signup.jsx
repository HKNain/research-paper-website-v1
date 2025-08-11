import React, { useState, useEffect } from 'react';

const initialState = {
  firstName: '',
  lastName: '',
  email: '',
  title: '',
  degree: '',
  country: '',
  phoneNumber: '',
  role: 'author', // default role
  password: '',
  collegeName: '',
  department: '',
  securityKey: ''
};

const Signup = () => {
  const [formData, setFormData] = useState(initialState);
  const [countries, setCountries] = useState([]);

  // Fetch country list once
  useEffect(() => {
    fetch("https://countriesnow.space/api/v0.1/countries")
      .then((res) => res.json())
      .then((data) => {
        console.log("Countries API Response:", data); // Debug
        if (data && data.data) {
          const countryList = data.data.map((c) => c.country).sort();
          setCountries(countryList);
        }
      })
      .catch((err) => console.error("Error fetching countries:", err));
  }, []);
  

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData); // replace with API call later

    // Save role in localStorage (testing only)
    localStorage.setItem("role", formData.role);

    // Redirect to profile
    window.location.href = "/login";
  };

  return (
    <div className="signup-container">
      <h2>Sign Up</h2>
      <form onSubmit={handleSubmit} className="signup-form">

        {/* Title */}
        <div className="form-group">
          <label>
            Title<span className="required">*</span>
          </label>
          <select name="title" onChange={handleChange} required>
            <option value="">Select Title</option>
            {["Mr.", "Mrs.", "Miss", "Ms.", "Mx.", "Dr.", "Prof.", "Engr.", "Fr.", "Rev."].map(title => (
              <option key={title} value={title}>{title}</option>
            ))}
          </select>
        </div>

        {/* First Name */}
        <div className="form-group">
          <label>
            First Name<span className="required">*</span>
          </label>
          <input type="text" name="firstName" minLength="6" required onChange={handleChange} />
        </div>

        {/* Last Name */}
        <div className="form-group">
          <label>Last Name</label>
          <input type="text" name="lastName" onChange={handleChange} />
        </div>

        {/* Email */}
        <div className="form-group">
          <label>
            Email<span className="required">*</span>
          </label>
          <input type="email" name="email" required onChange={handleChange} />
        </div>

        {/* Degree */}
        <div className="form-group">
          <label>Degree</label>
          <select name="degree" onChange={handleChange}>
            <option value="">Select Degree</option>
            {[
              "B.Sc", "B.A", "B.E", "B.Tech", "M.Sc", "M.A", "M.E", "M.Tech", "M.Phil", "Ph.D",
              "D.Sc", "LL.B", "LL.M", "MBA", "BBA", "B.Ed", "M.Ed", "MBBS", "MD", "BDS",
              "DVM", "CA", "CS", "CFA", "Diploma", "Other"
            ].map(degree => (
              <option key={degree} value={degree}>{degree}</option>
            ))}
          </select>
        </div>

        {/* Country */}
        <div className="form-group">
          <label>
            Country<span className="required">*</span>
          </label>
          <select
            name="country"
            required
            value={formData.country}
            onChange={handleChange}
          >
            <option value="">-- Select Country --</option>
            {countries.length > 0 &&
              countries.map((country, idx) => (
                <option key={idx} value={country}>
                  {country}
                </option>
              ))}
          </select>

        </div>

        {/* Phone Number */}
        <div className="form-group">
          <label>Phone Number</label>
          <input type="text" name="phoneNumber" onChange={handleChange} />
        </div>

        {/* Role */}
        <div className="form-group">
          <label>
            Role<span className="required">*</span>
          </label>
          <select name="role" value={formData.role} onChange={handleChange} required>
            <option value="admin">Admin</option>
            <option value="author">Author</option>
            <option value="reviewer">Reviewer</option>
          </select>
        </div>


        {/* Password */}
        <div className="form-group">
          <label>
            Password<span className="required">*</span>
          </label>
          <input type="password" name="password" minLength="6" required onChange={handleChange} />
        </div>

        {/* College Name */}
        <div className="form-group">
          <label>
            College Name<span className="required">*</span>
          </label>
          <input type="text" name="collegeName" required onChange={handleChange} />
        </div>

        {/* Department */}
        <div className="form-group">
          <label>Department</label>
          <input type="text" name="department" onChange={handleChange} />
        </div>

        {/* Security Key (Required only for Admin) */}
        {formData.role === "admin" && (
          <div className="form-group">
            <label>
              Security Key<span className="required">*</span>
            </label>
            <input
              type="text"
              name="securityKey"
              minLength="6"
              required
              onChange={handleChange}
            />
          </div>
        )}
 
        <div className="form-submit">
          <button type="submit">Register</button>
        </div>
      </form>
    </div>
  );
};

export default Signup;
