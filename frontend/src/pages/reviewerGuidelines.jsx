import React, { useEffect } from 'react';

// Optional: Load feather icons if you use them
import feather from 'feather-icons';

const ReviewerGuidelines = () => {
  useEffect(() => {
    feather.replace();
  }, []);

  return (
    <div className="wrapper-reviewerGuidelines">
      <div className="reviewerGuidelines-scope-section">
        <h1 className="reviewerGuidelines-scope-heading">Reviewer Guidelines</h1>
        <hr className="reviewerGuidelines-heading-line" />
      </div>

      <div className="reviewerGuidelines-fullsection">
        <p><strong>The Responsibility of the Peer Reviewer</strong><br />
          The peer reviewer is responsible for critically reading and evaluating a manuscript in their specialty field, and then providing respectful, constructive, and honest feedback to authors about their submission...
        </p>

        <p><strong>Before Reviewing</strong><br />Please consider the following:</p>

        <ul>
          <li>Does the article you are being asked to review match your expertise?... </li>
          <li>Do you have time to review the paper?... </li>
          <li>Are there any potential conflicts of interests?... </li>
        </ul>

        <p><strong>The Review</strong> <br />When reviewing the article, please keep the following in mind:</p>

        <ul>
          <li><strong>Content Quality and Originality:</strong> Does the article say something new... </li>
          <li><strong>Layout and format:</strong> Authors must comply fully with the journal’s author guidelines...</li>
        </ul>

        <p><strong>Organization and Clarity</strong></p>
        <ul>
          <li><strong>Title:</strong> Does it clearly describe the manuscript/article?... </li>
          <li><strong>Abstract:</strong> Does it reflect the content of the article?</li>
          <li><strong>Introduction:</strong> Does it describe what the author hoped to achieve accurately?... </li>
          <li><strong>Method:</strong> Does the author accurately explain how the data was collected?... </li>
          <li><strong>Statistical errors:</strong> These are common and so close attention should be paid.</li>
          <li><strong>Results:</strong> This is where the author/s should explain in words what they discovered...</li>
          <li><strong>Conclusion/Discussion:</strong> Are the claims in this section reasonable and supported by the results?</li>
          <li><strong>Graphics:</strong> Are they accurate, helpful, consistent, and easy to understand?</li>
          <li><strong>Language:</strong> Is the quality of English good enough to understand the author's argument?</li>
          <li><strong>Scope:</strong> Is the article in line with the aims and scope of the journal?</li>
        </ul>

        <p><strong>Guidelines for Written Comments</strong></p>
        <p>
          Please prepare detailed evaluative comments for the author(s)...
        </p>

        <p>The following format is suggested for preparing comments for the author(s):</p>

        <ul>
          <li><em>Identification of the contribution and major strengths of the paper.</em></li>
          <li><em>Major weaknesses of the paper.</em> Does the manuscript provide sufficient information... </li>
          <li><em>Other changes that would potentially strengthen the manuscript...</em></li>
          <li><em>Readability:</em> Is the paper readable and logically structured? </li>
          <li><em>Originality:</em> Does the paper contain new and significant information?</li>
          <li><em>Abstract and Title:</em> Are they accurate and appropriate?</li>
          <li><em>Relationship to Literature:</em> Does the paper cite relevant work?</li>
          <li><em>Methodology:</em> Is the approach valid and clearly explained?</li>
          <li><em>Results:</em> Are they clearly presented and interpreted correctly?</li>
          <li><em>Implications:</em> Does it show practical/societal/research implications?</li>
          <li><em>Quality of Communication:</em> Is the writing clear and appropriate for the audience?</li>
        </ul>

        <p>After you have completed the review process, you are required to make a recommendation to the Editor...</p>

        <p><strong>Recommendations:</strong></p>
        <ul>
          <li>Accept</li>
          <li>Minor Revisions</li>
          <li>Major Revisions</li>
          <li>Reject</li>
        </ul>

        <p><strong>Reviewers' Responsibilities</strong></p>
        <p>
          <em>Contribution to editorial decisions:</em> The peer-reviewing process assists the editor and the editorial board...<br />
          <em>Promptness:</em> Reviewers should notify the editor if they cannot complete a review in time...<br />
          <em>Confidentiality:</em> All manuscripts must be treated as confidential...<br />
          <em>Standards of objectivity:</em> Criticism must be objective, not personal...<br />
          <em>Acknowledgement of sources:</em> Reviewers should ensure all relevant work is cited properly...<br />
          <em>Disclosure and conflict of interest:</em> Reviewers must not use privileged information and must disclose any conflicts...
        </p>
      </div>
    </div>
  );
};

export default ReviewerGuidelines;
