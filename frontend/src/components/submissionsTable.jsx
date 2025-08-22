import React, { useEffect, useState } from "react";
import API from "../api/axios.js"; // adjust path

const SubmissionsTable = () => {
  const [submissions, setSubmissions] = useState([]);
  const [selectedSubmission, setSelectedSubmission] = useState(null);
  const formatDate = (dateStr) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString("en-US", {
      day: "numeric",
      month: "short", // gives "Aug"
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };
  
  useEffect(() => {
    const fetchSubmissions = async () => {
      try {
        const res = await API.get("/research/profile");
        const researchPapers = res.data.userInfo.researchPapers || [];
        const uploads = researchPapers.flatMap((p) => p.researchPaperUploads);
        setSubmissions(uploads);
      } catch (err) {
        console.error("Error fetching submissions:", err);
      }
    };
    fetchSubmissions();
  }, []);

  const openModal = (submission) => {
    setSelectedSubmission(submission);
  };

  const closeModal = () => {
    setSelectedSubmission(null);
  };

  // status color logic
  const getStatusStyle = (status) => {
    switch (status) {
      case "accepted":
        return { color: "green"};
      case "pending":
        return { color: "orange"};
      case "rejected":
        return { color: "red"};
      default:
        return {};
    }
  };

  return (
    <div className="grid-table-container">
      <div className="grid-table header">
        <div>S.No</div>
        <div>Category</div>
        <div>Status</div>
        <div>Action</div>
      </div>

      {submissions.length === 0 ? (
        <div className="grid-table">
          <div style={{ gridColumn: "1 / span 4", textAlign: "center" }}>
            No submissions found.
          </div>
        </div>
      ) : (
        submissions.map((sub, index) => (
          <div key={sub.uniqueId || index} className="grid-table">
            <div>{index + 1}</div>
            <div>{sub.categoryType || "N/A"}</div>
            <div style={getStatusStyle(sub.stats)}>{sub.stats}</div>
            <div>
              <a onClick={() => openModal(sub)}>View</a>
            </div>
          </div>
        ))
      )}

      {/* Modal (popup sheet) */}
      {selectedSubmission && (
        <div className="modal-overlay" onClick={closeModal}>
          <div
            className="modal-content"
            onClick={(e) => e.stopPropagation()} // stops closing when clicking inside
          >
            <div className="modal-close" onClick={closeModal}>
              ✖
            </div>
            <h3>Submission Details</h3>
            <p><strong>Submission ID:</strong> {selectedSubmission._id}</p>
            <p><strong>Unique ID:</strong> {selectedSubmission.uniqueId}</p>
            <p><strong>Category:</strong> {selectedSubmission.categoryType || "N/A"}</p>
            <p><strong>Status:</strong> 
              <span style={getStatusStyle(selectedSubmission.stats)}>
                {" "}{selectedSubmission.stats}
              </span>
            </p>
            <p><strong>Comment:</strong> {selectedSubmission.comment || "—"}</p>
            <p><strong>Uploaded At:</strong> {formatDate(selectedSubmission.uploadedAt)}</p>
            <p>
              <strong>PDF Link:</strong>{" "}
              <a
                href={selectedSubmission.researchPaperPdfUrl}
                target="_blank"
                rel="noreferrer"
              >
                {selectedSubmission.researchPaperPdfUrl}
              </a>
            </p>
            <a
              href={selectedSubmission.researchPaperPdfUrl}
              target="_blank"
              rel="noreferrer"
            >
              <button>View PDF</button>
            </a>
          </div>
        </div>
      )}
    </div>
  );
};

export default SubmissionsTable;
