import React from "react";


const EditorialBoard = () => {
  return (
    <>
      {/* Navbar Placeholder */}
      <div id="header"></div>

      <div className="editorial-wrapper">
        {/* Editor-in-Chief */}
        <div className="editorial-section-title">Editor-in-Chief</div>
        <div className="editorial-card">
          <img
            src="https://static.vecteezy.com/system/resources/previews/005/544/718/non_2x/profile-icon-design-free-vector.jpg"
            alt="Dr. Neetesh Purohit"
          />
          <div className="editorial-details">
            <h2>Dr. Neetesh Purohit</h2>
            <p>
              Dept. of Electronics and Communication Engineering,<br />
              IIIT Allahabad, India
            </p>
            <p>
              <i className="fas fa-phone"></i> +91-123456789 |{" "}
              <i className="fas fa-envelope"></i> editorinchief@iiit.ac.in
            </p>
            <p className="editorial-links">
              <a href="#">ORCID</a> | <a href="#">Scopus</a> |{" "}
              <a href="#">ResearchGate</a> | <a href="#">DBLP</a> |{" "}
              <a href="#">SSRN</a> | <a href="#">Google Scholar</a>
            </p>
          </div>
        </div>

        {/* Associate Editor-in-Chief */}
        <div className="editorial-section-title">Associate Editor-in-chief</div>
        <div className="editorial-card">
          <img
            src="https://static.vecteezy.com/system/resources/previews/005/544/718/non_2x/profile-icon-design-free-vector.jpg"
            alt="Dr. Shaligram Prajapat"
          />
          <div className="editorial-details">
            <h2>Dr. Shaligram Prajapat</h2>
            <p>
              International Institute of Professional Studies,<br />
              Devi Ahilya University, Indore, India
            </p>
            <p>
              <i className="fas fa-phone"></i> +91-123456789 |{" "}
              <i className="fas fa-envelope"></i> associateeditorinchief@iiit.ac.in
            </p>
            <p className="editorial-links">
              <a href="#">ResearchGate</a> | <a href="#">Scopus</a> |{" "}
              <a href="#">ResearchID(WoS)</a> | <a href="#">Google Scholar</a> |{" "}
              <a href="#">SSRN</a>
            </p>
          </div>
        </div>

        {/* Chief Patron */}
        <div className="editorial-section-title">Chief Patron</div>
        <div className="editorial-card">
          <img
            src="https://static.vecteezy.com/system/resources/previews/005/544/718/non_2x/profile-icon-design-free-vector.jpg"
            alt="Dr. N. S. Chaudhari"
          />
          <div className="editorial-details">
            <h2>Dr. N. S. Chaudhari</h2>
            <p>
              Dept. of Computer Science and Engineering,<br />
              IIT Indore, India
            </p>
            <p>
              <i className="fas fa-phone"></i> +91-123456789 |{" "}
              <i className="fas fa-envelope"></i> chiefpatron@iiit.ac.in
            </p>
            <p className="editorial-links">
              <a href="#">Google Scholar</a> | <a href="#">DBLP</a> |{" "}
              <a href="#">Scopus</a> | <a href="#">ORCID</a> |{" "}
              <a href="#">ResearchID(WoS)</a> | <a href="#">ResearchGate</a>
            </p>
          </div>
        </div>
      </div>

      {/* Footer Placeholder */}
      <div id="footer-footer"></div>
    </>
  );
};

export default EditorialBoard;
