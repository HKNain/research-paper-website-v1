import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from "react-toastify";
import API from '../api/axios';

const SubmitPaper = ({addPaper}) => {
  const [pdfFile, setPdfFile] = useState(null);
  const [category, setCategory] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleFileChange = (e) => {
    setPdfFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem("token");
    if (!token) {
      toast.error("You must be logged in to submit a paper.");
      navigate("/login");
      return;
    }

    if (!pdfFile) {
      toast.error("Please upload a PDF.");
      return;
    }

    const formData = new FormData();
    formData.append("file", pdfFile); // must match multer field
    formData.append("category", category);

    try {
      setLoading(true);
      const res = await API.post("/research/submit", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`
        }
      });
    
      toast.success("Paper submitted successfully!");
    
      // Push the new paper to table
      if (res.data.researchPaperUploads && res.data.researchPaperUploads.length > 0) {
        const newUpload = res.data.researchPaperUploads[0];
    
        addPaper({
          ...newUpload,
          uploadedAt: new Date(newUpload.uploadedAt), // make it a Date object
        });
      }
    
      // Don't navigate away! Let the user see the table update instantly
      setPdfFile(null);
      setCategory("");
    } catch (error) {
      console.error("Error submitting paper:", error);
      toast.error("Failed to submit paper. Try again.");
    } finally {
      setLoading(false);
    }    
  };

  const fetchSuggestions = async (text) => {
    if (text.length < 3) {
      setSuggestions([]);
      return;
    }

    const url = `https://api.openalex.org/concepts?search=${encodeURIComponent(text)}&filter=ancestors.id:C41008148&per_page=8`;
    const res = await fetch(url);
    const data = await res.json();
    setSuggestions(data.results || []);
  };
  
  return (
    <div className='static'>
      <div className="submit-container">
        <h2>Submit Your Research Paper</h2>
        <form onSubmit={handleSubmit} className="submit-form">
          <div className="form-group">
            <label>Upload PDF:</label>
            <input type="file" accept="application/pdf" onChange={handleFileChange} required disabled={loading}/>
          </div>

          <div className="form-group" style={{ position: "relative" }}>
            <label>Research Area (Category):</label>
            <input
              type="text"
              value={category}
              onChange={(e) => {
                setCategory(e.target.value);
                fetchSuggestions(e.target.value);
              }}
              // onBlur={() => {
              //   const matched = suggestions.find(
              //     (s) => s.display_name.toLowerCase() === category.trim().toLowerCase()
              //   );
              //   if (matched) {
              //     setCategory(matched.display_name); // Normalize name
              //   }
              //   setSuggestions([]);
              // }}
              placeholder="e.g. Machine Learning"
              autoComplete="off"
            />

            {suggestions.length > 0 && (
              <ul className="autocomplete-dropdown">
                {suggestions.map((sug) => (
                  <li
                    key={sug.id}
                    onClick={() => {
                      setCategory(sug.display_name);
                      setSuggestions([]);
                    }}
                  >
                    {sug.display_name}
                  </li>
                ))}
              </ul>
            )}
          </div>

          <button type="submit" className="submit-btn" disabled={loading}>
            {loading ? "Submitting..." : "Submit"}
          </button>

        </form>

        {/* Minimal inline styling or extract to CSS */}
        <style>{`
          .autocomplete-dropdown {
            position: absolute;
            top: 100%;
            left: 0;
            right: 0;
            background: white;
            border: 1px solid #ccc;
            z-index: 99;
            list-style: none;
            max-height: 200px;
            overflow-y: auto;
            margin: 0;
            padding: 0;
          }
          .autocomplete-dropdown li {
            padding: 8px 12px;
            cursor: pointer;
          }
          .autocomplete-dropdown li:hover {
            background-color: #f0f0f0;
          }
        `}</style>
      </div>
    </div>
  );
};

export default SubmitPaper;