import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import API from "../api/axios.js";

const AdminSubmissionsTable = () => {
  const [submissions, setSubmissions] = useState([]);
  const [selectedSubmission, setSelectedSubmission] = useState(null);
  const [reviewers, setReviewers] = useState([]);
  const [showReviewers, setShowReviewers] = useState(false);
  const [loadingReviewers, setLoadingReviewers] = useState(false);

  useEffect(() => {
    const fetchSubmissions = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await API.get("/research/admin/papers", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setSubmissions(res.data.usefulPapers || []);
      } catch (err) {
        console.error("❌ Error fetching submissions:", err);
      }
    };
    fetchSubmissions();
  }, []);

  // Prevent body scroll when modal is open
  useEffect(() => {
    if (selectedSubmission) {
      // Store original styles
      const originalStyle = window.getComputedStyle(document.body).overflow;
      
      // Disable body scroll
      document.body.style.overflow = "hidden";
      document.body.style.position = "fixed";
      document.body.style.top = `-${window.scrollY}px`;
      document.body.style.width = "100%";
      
      // Return cleanup function
      return () => {
        // Get the scroll position to restore
        const scrollY = document.body.style.top;
        
        // Restore original styles
        document.body.style.overflow = originalStyle;
        document.body.style.position = "";
        document.body.style.top = "";
        document.body.style.width = "";
        
        // Restore scroll position
        window.scrollTo(0, parseInt(scrollY || "0") * -1);
      };
    }
  }, [selectedSubmission]);

  const fetchReviewers = async () => {
    setLoadingReviewers(true);
    try {
      const token = localStorage.getItem("token");
      const res = await API.get("/research/admin/reviewers", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setReviewers(res.data.reviewers || []);
      setShowReviewers(true);
    } catch (err) {
      console.error("❌ Error fetching reviewers:", err);
      // Fallback: Mock data for testing
      setReviewers([
        { _id: "1", firstName: "Dr. John", lastName: "Smith", email: "john@example.com", specialization: "AI/ML" },
        { _id: "2", firstName: "Dr. Sarah", lastName: "Johnson", email: "sarah@example.com", specialization: "Data Science" },
        { _id: "3", firstName: "Dr. Mike", lastName: "Brown", email: "mike@example.com", specialization: "Software Engineering" },
      ]);
      setShowReviewers(true);
    } finally {
      setLoadingReviewers(false);
    }
  };

  const assignReviewer = async (reviewerId) => {
    try {
      const token = localStorage.getItem("token");
      await API.patch(`/research/admin/papers/${selectedSubmission.uploadId}/assign-reviewer`, {
        reviewerId: reviewerId
      }, {
        headers: { Authorization: `Bearer ${token}` },
      });
      
      toast.success("Reviewer assigned successfully!");
      
      // Update the selected submission with assignment info
      const updatedSubmission = { ...selectedSubmission, assignedReviewer: reviewerId };
      setSelectedSubmission(updatedSubmission);
      
      // Update the submissions list to reflect the change
      setSubmissions(prev => 
        prev.map(sub => 
          sub.uploadId === selectedSubmission.uploadId 
            ? { ...sub, assignedReviewer: reviewerId }
            : sub
        )
      );
      
      // Go back to details view
      setShowReviewers(false);
      
    } catch (err) {
      console.error("❌ Error assigning reviewer:", err);
      toast.error("Error assigning reviewer. Please try again.");
    }
  };

  const openModal = (submission) => {
    setSelectedSubmission(submission);
    setShowReviewers(false); // Reset reviewer view when opening modal
  };

  const closeModal = () => {
    setSelectedSubmission(null);
    setShowReviewers(false);
    setReviewers([]);
  };

  const getAssignmentStatusStyle = (assignedReviewer) => {
    return assignedReviewer 
      ? { color: "green"}
      : { color: "red"};
  };

  const getStatusStyle = (status) => {
    switch (status) {
      case "accepted": return { color: "green" };
      case "pending": return { color: "orange" };
      case "rejected": return { color: "red" };
      default: return {};
    }
  };

  return (
    <div className="grid-table-container">
      {/* Table Header */}
      <div
        className="grid-table header"
        style={{
          display: "grid",
          gridTemplateColumns: "50px 250px 1fr 120px 150px 100px",
          gap: "10px",
          fontWeight: "bold",
        }}
      >
        <div>S.No</div>
        <div>Author Name</div>
        <div>PDF</div>
        <div>Status</div>
        <div>Assignment Status</div>
        <div>Action</div>
      </div>

      {/* Table Body */}
      {submissions.length === 0 ? (
        <div className="grid-table">
          <div style={{ gridColumn: "1 / span 6", textAlign: "center" }}>
            No submissions found.
          </div>
        </div>
      ) : (
        submissions.map((sub, index) => (
          <div
            key={sub.uniqueId || index}
            className="grid-table"
            style={{
              display: "grid",
              gridTemplateColumns: "50px 250px 1fr 120px 150px 100px",
              gap: "10px",
              alignItems: "center",
            }}
          >
            <div>{index + 1}</div>
            <div>{sub.firstName + ' ' + sub.lastName}</div>
            <div>
              <a href={sub.linkOfPdf} target="_blank" rel="noreferrer">
                View PDF
              </a>
            </div>
            <div style={getStatusStyle(sub.stats)}>{sub.stats}</div>
            <div style={getAssignmentStatusStyle(sub.assignedReviewer)}>
              {sub.assignedReviewer ? 'Assigned' : 'Not Assigned'}
            </div>
            <div>
              <a onClick={() => openModal(sub)} style={{ cursor: "pointer", color: "blue" }}>
                Details
              </a>
            </div>
          </div>
        ))
      )}

      {/* Modal */}
      {selectedSubmission && (
        <div
          className="modal-overlay"
          onClick={closeModal}
          onWheel={(e) => {
            // Allow scrolling only within the modal content
            const modalContent = e.currentTarget.querySelector('.modal-content');
            if (!modalContent.contains(e.target)) {
              e.preventDefault();
            }
          }}
          onTouchMove={(e) => {
            // Prevent touch scrolling on mobile
            const modalContent = e.currentTarget.querySelector('.modal-content');
            if (!modalContent.contains(e.target)) {
              e.preventDefault();
            }
          }}
          style={{
            position: "fixed",
            top: 0, 
            left: 0, 
            width: "100%", 
            height: "100%",
            backgroundColor: "rgba(0,0,0,0.5)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 1000,
            overflowY: "hidden", // Changed from "auto" to "hidden"
          }}
        >
          <div
            className="modal-content"
            onClick={(e) => e.stopPropagation()}
            style={{
              background: "#fff",
              padding: "20px",
              borderRadius: "8px",
              width: showReviewers ? "700px" : "500px", // Wider when showing reviewers
              maxWidth: "90vw", // Responsive width
              maxHeight: "90vh", // Responsive height
              overflowY: "auto", // Allow scrolling within modal
              margin: "auto", // Center the modal
            }}
          >
            <div style={{ textAlign: "right", cursor: "pointer" }} onClick={closeModal}>
              ✖
            </div>
            
            {!showReviewers ? (
              // Submission Details View
              <>
                <h3>Submission Details</h3>
                <p><strong>Author:</strong> {selectedSubmission.firstName + ' ' + selectedSubmission.lastName}</p>
                <p><strong>Email:</strong> {selectedSubmission.email}</p>
                <p><strong>Category:</strong> {selectedSubmission.category}</p>
                <p><strong>Status:</strong> <span style={getStatusStyle(selectedSubmission.stats)}>{selectedSubmission.stats}</span></p>
                <p><strong>Assignment Status:</strong> <span style={getAssignmentStatusStyle(selectedSubmission.assignedReviewer)}>
                  {selectedSubmission.assignedReviewer ? 'Assigned' : 'Not Assigned'}
                </span></p>
                <p><strong>PDF Link:</strong> <a href={selectedSubmission.linkOfPdf} target="_blank" rel="noreferrer">Open PDF</a></p>
                
                <div style={{ marginTop: "20px", textAlign: "center" }}>
                  <button
                    onClick={fetchReviewers}
                    disabled={loadingReviewers}
                    style={{
                      backgroundColor: selectedSubmission.assignedReviewer ? "#6c757d" : "#007bff",
                      color: "white",
                      padding: "10px 20px",
                      border: "none",
                      borderRadius: "5px",
                      cursor: loadingReviewers ? "not-allowed" : "pointer",
                      fontSize: "16px"
                    }}
                  >
                    {loadingReviewers ? "Loading..." : selectedSubmission.assignedReviewer ? "Reassign Task" : "Assign Task"}
                  </button>
                </div>
              </>
            ) : (
              // Reviewers List View
              <>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }}>
                  <h3>Select Reviewer to Assign</h3>
                  <button
                    onClick={() => setShowReviewers(false)}
                    style={{
                      backgroundColor: "#6c757d",
                      color: "white",
                      padding: "5px 15px",
                      border: "none",
                      borderRadius: "3px",
                      cursor: "pointer"
                    }}
                  >
                    Back to Details
                  </button>
                </div>
                
                <p><strong>Paper:</strong> {selectedSubmission.firstName}'s submission</p>
                
                <div style={{ maxHeight: "400px", overflowY: "auto" }}>
                  {reviewers.length === 0 ? (
                    <p>No reviewers available.</p>
                  ) : (
                    reviewers.map((reviewer) => (
                      <div
                        key={reviewer._id}
                        style={{
                          border: "1px solid #ddd",
                          borderRadius: "5px",
                          padding: "15px",
                          marginBottom: "10px",
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "center"
                        }}
                      >
                        <div>
                          <h4 style={{ margin: "0 0 5px 0" }}>
                            {reviewer.firstName} {reviewer.lastName}
                          </h4>
                          <p style={{ margin: "0 0 5px 0", color: "#666" }}>
                            {reviewer.email}
                          </p>
                          {reviewer.specialization && (
                            <p style={{ margin: "0", fontSize: "14px", color: "#888" }}>
                              <strong>Specialization:</strong> {reviewer.specialization}
                            </p>
                          )}
                        </div>
                        <button
                          onClick={() => assignReviewer(reviewer._id)}
                          style={{
                            backgroundColor: "#28a745",
                            color: "white",
                            padding: "8px 16px",
                            border: "none",
                            borderRadius: "4px",
                            cursor: "pointer"
                          }}
                        >
                          Assign
                        </button>
                      </div>
                    ))
                  )}
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminSubmissionsTable;