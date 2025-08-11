import React, { useEffect } from 'react';

// Feather icons init
import feather from 'feather-icons';

const ResearchAreas = () => {
  useEffect(() => {
    feather.replace(); // Replace all feather icons
  }, []);

  return (
    <>
      {/* Navbar Placeholder */}
      <div id="header"></div>

      {/* Main Content */}
      <div className="wrapper-aim">

        <div className="aim-scope-section">
          <h1 className="aim-scope-heading">Research Areas</h1>
          <hr className="aim-heading-line" />

          <div className="aim-scope-main-section">
            <div>
              <p>
                <span><b>Aim- </b></span>The basic aim of this journal is to provide platform for the researcher, innovators, scholars and students to share their research through worldwide with us. We promote research in all disciplines and the advancement of knowledge and understanding. This journal will provide a quality readable and valuable addition to the knowledge this will serve as resources for researchers along with to provide support to the scholars to enable them to undertake and disseminate their research and to help them for development of their own skills of reasoning and understanding. It is a peer-reviewed journal aspiring to publish high quality of original Research Articles, Review Articles, Survey Articles, Case Study, Technical Notes and Short Communication. The preference will be given to the research articles and articles which contains advance research concepts which will be helpful to the society.
              </p>
              <p>
                <span><b>Scope- </b></span>JCSE which is cross boundaries between different faculties. IJCSE is the place for exchange of information and research results within the following scope: (But are not limited to the following)
              </p>
            </div>
          </div>
        </div>

        {/* Rest of Research Sections */}
        {/* You can split these into smaller components if needed */}
        <ResearchSection title="Computer Science Engineering and Technology" items1={[
          "Advanced Algorithms", "Applications of Computer Science", "Architecture Evaluations", "Artificial Intelligence", "Automation and Mobile Robots", "Bioengineering", "Bioinformatics", "Blue-Tooth Technologies", "Brain machine Interface System", "Brain Mapping", "Cloud Computing", "Computational Biology", "Computational Linguistics", "Computational Statistics", "Computational Mathematics", "Computer Graphics", "Computer Applications"
        ]} items2={[
          "Computer Architecture", "Compiler", "Computer Software / Hardware", "Cyber-Science and Cyber-Space", "Data and Information Systems", "Data Bases and its Applications", "Data Compression", "Data Engineering", "Data Fusion", "Data Mining", "Data Warehousing", "Databases", "Design of Algorithms", "Digital Speech Processing", "Distributed Data Base", "Distributed Knowledge-base Systems", "Distributed Multimedia"
        ]} />

        {/* Add more <ResearchSection /> below similarly for each section */}
        {/* Or if you'd like, I can extract all sections into components for reusability */}

      </div>

      {/* Footer Placeholder */}
      <div id="footer-footer"></div>
    </>
  );
};

const ResearchSection = ({ title, items1, items2 }) => (
  <div className="aim-scope-list-fullsection">
    <h3>{title}</h3>
    <div className="two-column-list">
      <ul>{items1.map((item, idx) => <li key={idx}>{item}</li>)}</ul>
      <ul>{items2.map((item, idx) => <li key={idx}>{item}</li>)}</ul>
    </div>
  </div>
);

export default ResearchAreas;
