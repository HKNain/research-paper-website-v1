import { Link } from 'react-router-dom';
import sirImage from '../assets/sir.jpg';

const IndexPage = () => {

  return (
    <>
      <main id="main-content">
        
        <div className="wrapper">
          {/* Hero Section */}
          <section className="hero-section" aria-labelledby="main-heading">
            <h1 id="main-heading" className="main-heading">
              International Journal of Computer Science
            </h1>
            <div className="hero-container">
              <div className="hero-image">
                <div className="main-image">
                  <svg width="225" height="300" viewBox="0 0 300 400" xmlns="http://www.w3.org/2000/svg">
                    <defs>
                      <linearGradient id="coverGradient" x1="0" y1="0" x2="1" y2="1">
                        <stop offset="0%" stopColor="#e0e0ff"/>
                        <stop offset="100%" stopColor="#ffffff"/>
                      </linearGradient>
                      <linearGradient id="titleGradient" x1="0" y1="0" x2="1" y2="1">
                        <stop offset="0%" stopColor="#333333"/>
                        <stop offset="100%" stopColor="#000000"/>
                      </linearGradient>
                    </defs>
                    
                    {/* Book Cover */}
                    <rect x="40" y="40" width="220" height="320" rx="16" fill="url(#coverGradient)" />
                    
                    {/* Spine */}
                    <rect x="40" y="40" width="20" height="320" rx="5" fill="#ccccff"/>
                    <text x="53" y="200" fontFamily="Arial" fontSize="10" fill="#222" 
                          transform="rotate(-90 53 200)" textAnchor="middle">
                      The Future of Code
                    </text>
                    
                    {/* Title */}
                    <text x="150" y="110" fontFamily="Helvetica Neue, Arial, sans-serif" fontSize="28" 
                          fill="url(#titleGradient)" fontWeight="bold" textAnchor="middle">THE</text>
                    <text x="150" y="160" fontFamily="Helvetica Neue, Arial, sans-serif" fontSize="36" 
                          fill="url(#titleGradient)" fontWeight="bold" textAnchor="middle">FUTURE</text>
                    <text x="150" y="210" fontFamily="Helvetica Neue, Arial, sans-serif" fontSize="36" 
                          fill="url(#titleGradient)" fontWeight="bold" textAnchor="middle">OF CODE</text>
                    
                    {/* Author */}
                    <text x="150" y="260" fontFamily="Georgia, serif" fontSize="14" fill="#333" textAnchor="middle">
                      by - Dr. Tayyab Khan
                    </text>
                    
                    {/* Subtitle */}
                    <text x="150" y="295" fontFamily="Arial" fontSize="12" fill="#555" textAnchor="middle">
                      An in-depth guide to modern
                    </text>
                    <text x="150" y="312" fontFamily="Arial" fontSize="12" fill="#555" textAnchor="middle">
                      software and programming.
                    </text>
                    
                    {/* Shadow */}
                    <ellipse cx="150" cy="375" rx="100" ry="10" fill="#00000033" />
                  </svg>
                </div>
              </div>

              <div className="hero-content">
                <p className="hero-subtitle">
                  Advancing Computer Science through rigorous peer review and open access publication. 
                  Join our global community of researchers and innovators shaping the future of technology.
                </p>
                
                <div className="editor-info-section">
                  <div className="editor-chief">
                    <h3>Editor-in-Chief</h3>
                    <p className="editor-name">Dr. Tayyab (IIIT SONEPAT)</p>
                  </div>
                </div>

                <div className="journal-info-grid">
                  <div className="info-item">
                    <span className="info-label">ISSN</span>
                    <span className="info-value">2347-2693 (Online)</span>
                  </div>
                  <div className="info-item">
                    <span className="info-label">Frequency</span>
                    <span className="info-value">12 Times a Year</span>
                  </div>
                  <div className="info-item">
                    <span className="info-label">Open Access</span>
                    <span className="info-value">Free Accessible</span>
                  </div>
                  <div className="info-item">
                    <span className="info-label">Review Process</span>
                    <span className="info-value">Double Blind Review</span>
                  </div>
                  <div className="info-item">
                    <span className="info-label">Acceptance Time</span>
                    <span className="info-value">2 to 15 weeks</span>
                  </div>
                  <div className="info-item">
                    <span className="info-label">Publication Process</span>
                    <span className="info-value">Online First</span>
                  </div>
                  <div className="info-item">
                    <span className="info-label">Publisher</span>
                    <span className="info-value">ISROSET, Indore</span>
                  </div>
                </div>
                
                <div className="hero-footer">
                  <Link to="/submit">
                    <button className="submit-manuscript-btn">Submit Your Manuscript</button>
                  </Link>
                </div>
              </div>
            </div>
          </section>

          {/* Box Container */}
          <div className="box-container">
            <div className="box box-1">
              <h3>About the journal</h3>
              <p>
                The International Journal of eScience Computing infrastructures and systems are rapidly 
                developing and so are novel ways to map, control and execute scientific applications 
                which become more and more complex and collaborative. Computational and storage capabilities, 
                databases, sensors, and people …
              </p>
              <a href="/aim">View full aims and scope</a>
            </div>
            <div className="box box-2">
              <h3>Article publishing options</h3>
              <h4>Open Access</h4>
              <p>
                Article Publishing Charge (APC): USD 3,000 (excluding taxes). The amount you pay may 
                be reduced during submission if applicable
              </p>
              <div className="merge">
                <p>Review</p>
                <a href="#"> this journal's open access policy.</a>
              </div>
              <h4>Subscription</h4>
              <p>No publication fee charged to authors, and published articles are immediately available to subscribers.</p>
            </div>
          </div>

          {/* Stats Container */}
          <div className="stats-container">
            <div className="stat-box">
              <h2>5000</h2>
              <p>Published Papers</p>
            </div>
            <div className="stat-box">
              <h2>1500000</h2>
              <p>Total Citations</p>
            </div>
            <div className="stat-box">
              <h2>98</h2>
              <p>Acceptance Rate</p>
            </div>
            <div className="stat-box">
              <h2>15000</h2>
              <p>Active Authors</p>
            </div>
            <div className="stat-box">
              <h2>45</h2>
              <p>Countries</p>
            </div>
          </div>

          {/* Editorial */}
          <div className="to">
            <div className="editor">
              <div className="two">
                <p>Editor in Chief</p>
                <a href="#">View full editorial board</a>
              </div>
              <div className="editor-body">
              <img src={sirImage} alt="Image" />
                <div className="editor-info-right">
                  <h3>Dr. Tayyab</h3>
                  <p>Professor & Head of Department, Computer Science & Engineering (IIIT Sonepat)</p>
                </div>
              </div>
            </div>
          </div>

          {/* Requirements Section */}
          <div className="requirements-section">
            <div className="requirements-container">
              <h2>
                Article/Paper Acceptance Requirements
                <svg className="requirements-icon" xmlns="http://www.w3.org/2000/svg" width="24" height="24" 
                     viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" 
                     strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10"></circle>
                  <polyline points="8 12 11 15 16 9"></polyline>
                </svg>
              </h2>
              <p className="intro-text">The criteria for an article to be accepted for publication include:</p>
              <div className="requirements-list">
                <div className="requirement-item">
                  <span className="bullet">•</span>
                  <p>The article is presented in an intelligible fashion and is written in IJCSE Template.</p>
                </div>
                <div className="requirement-item">
                  <span className="bullet">•</span>
                  <p>The article should be original writing that enhances the existing body of knowledge in the given subject area.</p>
                </div>
                <div className="requirement-item">
                  <span className="bullet">•</span>
                  <p>Results reported have not been submitted or published elsewhere.</p>
                </div>
                <div className="requirement-item">
                  <span className="bullet">•</span>
                  <p>Experiments, statistics, and other analyses are performed to a high technical standard and are described in sufficient detail.</p>
                </div>
                <div className="requirement-item">
                  <span className="bullet">•</span>
                  <p>Conclusions are presented in an appropriate fashion and are supported by the data.</p>
                </div>
                <div className="requirement-item">
                  <span className="bullet">•</span>
                  <p>All figure/Image should be showing clearly and Clearly mention figure name and numbers in increasing order.</p>
                </div>
                <div className="requirement-item">
                  <span className="bullet">•</span>
                  <p>Equation/Formula should be in Math's equation editor Software (equation editor software). Please do not give scanned equation/formula.</p>
                </div>
                <div className="requirement-item">
                  <span className="bullet">•</span>
                  <p>Tables should be in MS Word. Please do not give scanned equation/formula.</p>
                </div>
                <div className="requirement-item">
                  <span className="bullet">•</span>
                  <p>Appropriate references to related prior published works must be included in IJCSE Standard.</p>
                </div>
              </div>

              <div className="review-process">
                <p>
                  All the submitted papers are first reviewed at editorial board level and assessed on the basis 
                  of their technical suitability for the journal, scope of work and plagiarism. We are using 
                  Turnitin / Plagiarism CheckerX software to check the Plagiarism / Similarity Index of the paper 
                  submitted for IJCSE. If selected by the editorial board, the paper shall be subjected to a fair 
                  and unbiased double blind peer review by at-least two referees on the basis of their originality, 
                  novelty, clarity, completeness, relevance, significance and research contribution. The review process 
                  may take 05 to 15 days depending upon the cycles of review required, before the paper is finally 
                  accepted. Please refer to Authors Guidelines for details of reviewing process and to submit your 
                  papers please refer to Online Submission System.
                </p>
              </div>

              <div className="submission-note">
                <p>
                  Please note that all manuscripts/papers/articles MUST be submitted through the Online Submission 
                  System. Manuscripts/papers/articles submitted outside of the system will not be considered for publication.
                </p>
              </div>
            </div>
          </div>

          {/* Call for Papers Section */}
          <section className="calls-section" id="calls" aria-labelledby="calls-heading">
            <div className="calls-container">
              <h2 id="calls-heading" className="section-heading">Current Call for Papers</h2>
              <div className="calls-grid">
                {Array.from({ length: 4 }, (_, index) => (
                  <div key={index} className="call-card" data-index="0">
                    <div className="call-header">
                      <h3>Special Issue: AI and Machine Learning Applications</h3>
                      <span className="call-deadline">Deadline: March 15, 2025</span>
                    </div>
                    <div className="call-content">
                      <p>
                        We invite researchers to submit original research on artificial intelligence, 
                        machine learning algorithms, deep learning applications, and their real-world 
                        implementations across various domains.
                      </p>
                      <ul className="call-topics">
                        <li>Deep Learning and Neural Networks</li>
                        <li>Natural Language Processing</li>
                        <li>Computer Vision and Image Processing</li>
                        <li>AI in Healthcare and Biomedical Applications</li>
                      </ul>
                    </div>
                    <div className="call-footer">
                      <button className="call-submit-btn">Submit Now</button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Latest Articles Section */}
          <div className="latest-articles-section">
            <h2 className="latest-heading">Latest Articles</h2>
            <div className="articles-grid">
              {[
                {
                  image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
                  title: "Advances in Quantum Machine Learning",
                  date: "March 15, 2024",
                  excerpt: "Exploring the intersection of quantum computing and machine learning algorithms for enhanced computational capabilities...",
                  alt: "AI Research"
                },
                {
                  image: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
                  title: "Big Data Analytics in Healthcare",
                  date: "March 12, 2024",
                  excerpt: "Revolutionizing patient care through advanced data analytics and predictive modeling...",
                  alt: "Data Science"
                },
                {
                  image: "https://images.unsplash.com/photo-1563986768609-322da13575f3?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
                  title: "Next-Gen Cybersecurity Protocols",
                  date: "March 10, 2024",
                  excerpt: "Implementing advanced security measures in the era of quantum computing...",
                  alt: "Cybersecurity"
                },
                {
                  image: "https://images.unsplash.com/photo-1544197150-b99a580bb7a8?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
                  title: "Cloud Infrastructure Optimization",
                  date: "March 8, 2024",
                  excerpt: "Strategies for efficient resource allocation in distributed cloud systems...",
                  alt: "Cloud Computing"
                },
                {
                  image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
                  title: "IoT in Smart Cities",
                  date: "March 5, 2024",
                  excerpt: "Building sustainable urban environments through connected technology...",
                  alt: "IoT"
                },
                {
                  image: "https://images.unsplash.com/photo-1639762681057-408e52192e55?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
                  title: "Blockchain in Supply Chain Management",
                  date: "March 3, 2024",
                  excerpt: "Revolutionizing supply chain transparency and efficiency through distributed ledger technology...",
                  alt: "Blockchain"
                }
              ].map((article, index) => (
                <div key={index} className="article-card">
                  <div className="article-image">
                    <img src={article.image} alt={article.alt} />
                  </div>
                  <div className="article-content">
                    <h3>{article.title}</h3>
                    <p className="article-meta">Published: {article.date}</p>
                    <p className="article-excerpt">{article.excerpt}</p>
                  </div>
                </div>
              ))}
            </div>
            <button className="view-all-articles-btn">
              <span>View all articles</span>
              <svg className="arrow-icon" xmlns="http://www.w3.org/2000/svg" width="20" height="20" 
                   viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" 
                   strokeLinecap="round" strokeLinejoin="round">
                <line x1="5" y1="12" x2="19" y2="12"></line>
                <polyline points="12 5 19 12 12 19"></polyline>
              </svg>
            </button>
          </div>

          {/* Journal Updates Section */}
          <div className="journal-updates-section">
            <h2 className="updates-heading">Journal Updates</h2>
            <div className="updates-container">
              {[
                {
                  title: "New Impact Factor",
                  content: "Our journal has achieved an impact factor of 3.5 for the year 2023",
                  date: "March 15, 2024",
                  icon: (
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" 
                         fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <circle cx="12" cy="12" r="10"></circle>
                      <polyline points="12 6 12 12 16 14"></polyline>
                    </svg>
                  )
                },
                {
                  title: "New Editorial Board Members",
                  content: "Welcome to our new editorial board members from leading institutions",
                  date: "March 10, 2024",
                  icon: (
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" 
                         fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                      <circle cx="9" cy="7" r="4"></circle>
                      <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
                      <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
                    </svg>
                  )
                },
                {
                  title: "Citation Milestone",
                  content: "Reached 10,000 citations across all published articles",
                  date: "March 5, 2024",
                  icon: (
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" 
                         fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M22 12h-4l-3 9L9 3l-3 9H2"></path>
                    </svg>
                  )
                },
                {
                  title: "New Special Issue",
                  content: "Announcing our upcoming special issue on AI and Machine Learning",
                  date: "March 1, 2024",
                  icon: (
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" 
                         fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z"></path>
                      <line x1="4" y1="15" x2="4" y2="21"></line>
                    </svg>
                  )
                }
              ].map((update, index) => (
                <div key={index} className="update-card">
                  <div className="update-icon">
                    {update.icon}
                  </div>
                  <div className="update-content">
                    <h3>{update.title}</h3>
                    <p>{update.content}</p>
                    <span className="update-date">{update.date}</span>
                  </div>
                </div>
              ))}
            </div>
            <button className="view-all-updates-btn">
              <span>View all updates</span>
              <svg className="arrow-icon" xmlns="http://www.w3.org/2000/svg" width="20" height="20" 
                   viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" 
                   strokeLinecap="round" strokeLinejoin="round">
                <line x1="5" y1="12" x2="19" y2="12"></line>
                <polyline points="12 5 19 12 12 19"></polyline>
              </svg>
            </button>
          </div>
        </div>

      </main>
    </>
  );
};

export default IndexPage;