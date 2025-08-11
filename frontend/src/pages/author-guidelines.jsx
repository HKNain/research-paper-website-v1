import React, { useEffect } from "react";

// Importing feather icons script if needed
const loadFeatherIcons = () => {
  const script = document.createElement("script");
  script.src = "https://cdnjs.cloudflare.com/ajax/libs/feather-icons/4.29.0/feather.min.js";
  script.async = true;
  script.onload = () => window.feather && window.feather.replace();
  document.body.appendChild(script);
};

const AuthorGuidelines = () => {
  useEffect(() => {
    loadFeatherIcons();
  }, []);

  return (
    <>
      {/* Header */}
      <div id="header"></div>

      {/* Wrapper */}
      <div className="wrapper-author-guidelines">
        <div className="author-guidelines-scope-section">
          <h1 className="author-guidelines-scope-heading">Guidelines for Authors</h1>
          <hr className="author-guidelines-heading-line" />
        </div>

        <div className="author-guidelines-fullsection">
          {/* Each paragraph and section should be extracted for clarity */}
          <p><strong>A. Paper Submission</strong></p>
          <p>
            Authors will be required to submit MS-Word compatible (.doc, .docx) papers electronically...
          </p>

          <p><strong>B. Paper Format and Page Layout</strong></p>
          <p>
            While preparing and formatting papers, authors must confirm to the under-mentioned MS-Word (.doc, .docx) format:
          </p>

          <ul>
            <li>All manuscripts must be in English and in MS-Word format.</li>
            <li>The total length of the paper, including references, must not exceed 25 pages...</li>
            {/* Add all list items here as in original HTML */}
          </ul>

          {/* Continue translating content using <p>, <strong>, <ul>, etc. */}

          <p><strong>C. Structure of Paper</strong></p>
          <p><strong>Essential Title Page Information</strong></p>
          <ul>
            <li><strong>Title:</strong> Concise and informative...</li>
            <li><strong>Authors’ Names and Affiliations:</strong> Present the authors' affiliation addresses...</li>
            {/* Add remaining items */}
          </ul>

          <p><strong>Abstract</strong></p>
          <p>
            A concise abstract not exceeding 180–240 words is required...
          </p>

          <p><strong>References</strong></p>
          <ul>
            <li><strong>Format for Journal Paper:</strong> S.K. Sharma, L. Gupta, “A Novel Approach…”</li>
            <li><strong>Format for Book:</strong> K. Gupta, “A Proposed New Approach…”</li>
            <li><strong>Format for Conference Paper:</strong> S.L. Mewada, “A Proposed New Approach…”</li>
          </ul>

          <p>
            <strong>For Example:</strong><br />
            Mr. C T Lin pursued B.Tech., M.Tech., and Ph.D. Physical Science...
          </p>

          <p><strong>D. Copyright</strong><br />
            Copyright of all accepted papers will belong to IJCSE...
          </p>

          <p><strong>E. Final Proof of the Paper</strong></p>
          <p>
            One set of page proofs (as PDF files) will be sent...
          </p>

          <p>
            If you have any questions please feel free to contact us: <a href="mailto:editor@ijcseonline.org">editor@ijcseonline.org</a>
          </p>
        </div>
      </div>

      {/* Footer */}
      <div id="footer-footer"></div>
    </>
  );
};

export default AuthorGuidelines;
