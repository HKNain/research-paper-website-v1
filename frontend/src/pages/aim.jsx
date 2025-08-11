import React, { useEffect } from "react";

export default function Aim() {
  useEffect(() => {
    // Dynamically load scripts like head.js and footer.js
    const headScript = document.createElement("script");
    headScript.src = "/JAVASCRIPT/head.js";
    headScript.defer = true;
    document.body.appendChild(headScript);

    const footerScript = document.createElement("script");
    footerScript.src = "/JAVASCRIPT/footer.js";
    footerScript.defer = true;
    document.body.appendChild(footerScript);

    const indexScript = document.createElement("script");
    indexScript.src = "/JAVASCRIPT/index.js";
    indexScript.defer = true;
    document.body.appendChild(indexScript);
  }, []);

  return (
    <>
      
      <div>
        {/* Header placeholder (filled by head.js) */}
        <div id="header"></div>

        {/* Aim Page Content */}
        <div className="wrapper-aim">
          <div className="aim-scope-section">
            <h1 className="aim-scope-heading">Aim & Scope</h1>
            <hr className="aim-heading-line" />

            <div className="aim-scope-main-section">
              <div>
                <p>
                  <span><b>Aim- </b></span>
                  The basic aim of this journal is to provide platform for the researcher, innovators, scholars and students to share their research through worldwide with us...
                </p>
                <p>
                  <span><b>Scope- </b></span>
                  JCSE which is cross boundaries between different faculties...
                </p>
              </div>
            </div>
          </div>

          {/* Huge list content section */}
          <div className="aim-scope-list-fullsection">
            <Section title="Computer Science Engineering and Technology" items={[
              "Advanced Algorithms", "Applications of Computer Science", "Architecture Evaluations",
              "Artificial Intelligence", "Automation and Mobile Robots", "Bioengineering", "Bioinformatics",
              "Blue-Tooth Technologies", "Brain machine Interface System", "Brain Mapping", "Cloud Computing",
              "Computational Biology", "Computational Linguistics", "Computational Statistics", "Computational Mathematics",
              "Computer Graphics", "Computer Applications", "Computer Architecture", "Compiler", "Computer Software / Hardware"
            ]} />

            <Section title="Computer Networks" items={[
              "Ad hoc & sensor networks", "Adaptive applications", "Admission/Congestion/Flow Control",
              "Authentication, authorization, accounting", "Broadband Communications", "Broadband Networks"
            ]} />

            <Section title="Mobile Computing" items={[
              "Mobility management", "Distributed Real Time Systems", "E-commerce", "Education Technology and Training"
            ]} />

            <Section title="Multimedia Computing" items={[
              "AI and Image Recognition", "Audio Analysis, Modeling, Processing and Transformation",
              "Content-Based Image Retrieval", "Distributed Multimedia System"
            ]} />

            <Section title="Computational Mathematics" items={[
              "Algorithms and Implementations", "Analysis of Mathematics", "Applications in CAGD/CAD, robotics, and computer vision"
            ]} />

            <Section title="Computational Oriented" items={[
              "Cheminformatics", "Chemometrics", "Computational biology", "Computational chemistry"
            ]} />

            <Section title="Software Engineering" items={[
              "The Software Process", "Software Engineering Practice", "Web Engineering", "Quality Management"
            ]} />

            <Section title="Mechanical Engineering" items={[
              "Acoustics", "Active perception & 3-D perception", "Aerodynamics", "Analytical mechanics", "Applied Mechanics"
            ]} />

            <Section title="Civil Engineering" items={[
              "Dynamics and Random Vibrations", "Fracture and Fatigue Mechanics", "Non-linear behavior of structures"
            ]} />

            <Section title="Electronics & Electrical Engineering" items={[
              "Electric Power Generation", "Transmission and Distribution", "Power Electronics", "Power Quality"
            ]} />

            <Section title="Management and Information Sciences" items={[
              "Human resource management and computing science", "Architectures/infrastructures",
              "Bioinformatics, social informatics"
            ]} />
          </div>
        </div>

        {/* Footer placeholder */}
        <div id="footer-footer"></div>
      </div>
    </>
  );
}

// Sub-component for each Section
function Section({ title, items }) {
  const mid = Math.ceil(items.length / 2);
  const firstHalf = items.slice(0, mid);
  const secondHalf = items.slice(mid);

  return (
    <>
      <h3>{title}</h3>
      <div className="two-column-list">
        <ul>
          {firstHalf.map((item, index) => <li key={index}>{item}</li>)}
        </ul>
        <ul>
          {secondHalf.map((item, index) => <li key={index + mid}>{item}</li>)}
        </ul>
      </div>
    </>
  );
}
