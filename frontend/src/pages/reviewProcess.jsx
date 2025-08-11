import React, { useEffect } from 'react';
import feather from 'feather-icons';

const ReviewProcess = () => {
  useEffect(() => {
    feather.replace(); // Initialize icons after render
  }, []);

  return (
    <div className="wrapper-reviewProcess">
      <div className="reviewProcess-scope-section">
        <h1 className="reviewProcess-scope-heading">Review Process</h1>
        <hr className="reviewProcess-heading-line" />
      </div>

      <div className="reviewProcess-fullsection">
        <p>
          All papers of the journal are peer reviewed by two independent reviewers...
          Acceptance is granted when both reviewers’ recommendations are positive...
        </p>

        <p><b>Initial review:</b> The Editor-in-Chief evaluates each paper to determine if its topic and content is suitable...
        </p>

        <p><b>Peer review:</b> Papers that pass the initial review are assigned to an Associate Editor...
        </p>

        <p><b>Recommendation:</b> Based on the referees' comments and the Associate Editor's recommendation...
        </p>

        <p>
          If recommended by the Board of Referees (BoR), the papers may undergo multiple cycles of review...
        </p>

        <p><b>Peer review purpose:</b></p>

        <ul className="col-md-12">
          <li>
            To help select quality articles for publication...
            <ul style={{ listStyle: 'circle' }}>
              <li>The scientific merit and validity of the article and its methodology</li>
              <li>The relevance of the article – select work that will be the greatest interest to the readership</li>
            </ul>
          </li>
          <li>To improve the manuscript whenever possible.</li>
          <li>To check against malfeasance/dishonesty within the scientific and research community.</li>
          <li>Provide editors with evidence to make judgments as to whether articles meet the selection criteria for their particular publication.</li>
        </ul>

        <p><b>Final Proof of the Paper:</b> One set of page proofs (as PDF files) will be sent by e-mail...
          <a href="http://get.adobe.com/reader" target="_blank" rel="noreferrer">http://get.adobe.com/reader</a>...
        </p>

        <p>
          The main functions of the peer review process are to help maintain standards and ensure that the reporting
          of research work is as truthful and accurate as possible.
        </p>

        <img
          src="https://www.ijcseonline.org/images/Peer-Review%20Process.jpg"
          alt="Peer Review Process"
          className="img-responsive"
        />
      </div>
    </div>
  );
};

export default ReviewProcess;
