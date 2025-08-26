// src/components/reviewerTasksTable.jsx
import React, { useEffect, useRef, useState } from "react";
import API from "../api/axios.js";

const ReviewerTasksTable = () => {
  const [tasks, setTasks] = useState([]);
  const [selectedTask, setSelectedTask] = useState(null);
  const [comment, setComment] = useState("");
  const [status, setStatus] = useState("");
  const [isAcceptedReviewer,setAcceptedReviwer] = useState ("");

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const res = await API.get("/research/reviewer/tasks"); 
        setTasks(res.data.tasks || []);
        
      } catch (err) {
        console.error("Error fetching reviewer tasks:", err);
        return 
      }
    };
    fetchTasks();
  }, []);

 
 

  
  //  * PatchToBeReviwer

  const handleReviewerResponseToBeReviewer = async (paperId, reviewerApproval) => {
  try {
    const res = await API.patch(
      `/research/reviewerAccepted/${paperId}`,
      { reviewerApproval }  
    );
    console.log (res)
    setAcceptedReviwer(res.data.message);
  } catch (error) {
    
    console.log("Error in handleReviewerResponseToBeReviewer:", error);
  }
};

  

  const openModal = (task) => {
    setSelectedTask(task);
    setComment(task.comment || "");
    setStatus(task.stats || "pending");
  };

  const closeModal = () => {
    setSelectedTask(null);
    setComment("");
    setStatus("");
  };

  const handleReviewSubmit = async () => {
    try {
      await API.post(`/research/reviewer/review/${selectedTask._id}`, {
        comment,
        status,
      });
      alert("✅ Review submitted successfully!");
      closeModal();
    } catch (err) {
      console.error("Error submitting review:", err);
      alert("❌ Failed to submit review");
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

      {tasks.length === 0 ? (
        <div className="grid-table">
          <div style={{ gridColumn: "1 / span 4", textAlign: "center" }}>
            No tasks assigned.
          </div>
        </div>
      ) : (
        tasks.map((task, index) => (
          <div className="grid-table" key={task._id || index}>
            <div>{index + 1}</div>
            <div>{task.categoryType || "N/A"}</div>
            <div
              style={{
                color:
                  task.stats?.toLowerCase() === "accepted"
                    ? "green"
                    : task.stats?.toLowerCase() === "pending"
                    ? "orange"
                    : "red",
                fontWeight: "bold",
              }}
            >
              {task.stats}
            </div>
            <div>
              <button onClick={() => openModal(task)}>Review</button>
            </div>
          </div>
        ))
      )}

      {/* Modal */}
      {selectedTask && (
        <div className="modal-overlay" onClick={closeModal}>
          <div
            className="modal-content"
            onClick={(e) => e.stopPropagation()}
            style={{ maxWidth: "700px" }}
          >
            <button className="modal-close" onClick={closeModal}>
              ✖
            </button>
            <h3>Review Task</h3>

            <p><strong>Submission ID:</strong> {selectedTask._id}</p>
            <p><strong>Unique ID:</strong> {selectedTask.uniqueId}</p>
            <p><strong>Category:</strong> {selectedTask.categoryType || "N/A"}</p>
            <p>
              <strong>Uploaded At:</strong>{" "}
              {new Date(selectedTask.uploadedAt).toLocaleString("en-US", {
                year: "numeric",
                month: "short",
                day: "numeric",
                hour: "2-digit",
                minute: "2-digit",
              })}
            </p>
            <a
              href={selectedTask.researchPaperPdfUrl}
              target="_blank"
              rel="noreferrer"
            >
              <button>View PDF</button>
            </a>
{
  (selectedTask.reviewerApproval === 'rejected' || selectedTask.reviewerApproval === 'no response') && (
    <div className="flex">
      <button onClick={() => handleReviewerResponseToBeReviewer(selectedTask.uniqueId, "accepted")}>Accept</button>
      <button onClick={() => handleReviewerResponseToBeReviewer(selectedTask.uniqueId, "rejected")}>Reject</button>
    </div>
  )

}            {/* Review Form */}
            {/* starts  */}
        {         
          (selectedTask.reviewerApproval === 'accepted') && (<>
  
  
            <div style={{ marginTop: "20px" }}>
              <label style={{ fontWeight: "bold" }}>Comment:</label>
              <textarea
                rows="4"
                style={{
                  width: "100%",
                  padding: "8px",
                  borderRadius: "6px",
                  border: "1px solid #ccc",
                }}
                value={comment}
                onChange={(e) => setComment(e.target.value)}
              />
            </div>

            <div style={{ marginTop: "15px" }}>
              <label style={{ fontWeight: "bold", marginRight: "10px" }}>
                Status:
              </label>
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value)}
              >
                <option value="pending">Pending</option>
                <option value="accepted">Accepted</option>
                <option value="rejected">Rejected</option>
              </select>
            </div>

            <div style={{ marginTop: "20px", textAlign: "right" }}>
              <button onClick={handleReviewSubmit}>Submit Review</button>
            </div>
        
          </>)
       }
            {/* end  */}
          </div>
        </div>
      )}
    </div>
  );
};

export default ReviewerTasksTable;
