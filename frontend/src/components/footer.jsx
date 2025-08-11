const Footer = () => {

  return (
    <div id="footer-footer">

      {/* Top Wave with Gradient */}
      <div className="footer-wave">
        <svg viewBox="0 0 1440 150" preserveAspectRatio="none">
          <defs>
            <linearGradient id="footerGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#0e1d2b" />
              <stop offset="50%" stopColor="#0a0f1a" />
              <stop offset="100%" stopColor="#000000" />
            </linearGradient>
          </defs>
          <path
            d="M0,96L80,106.7C160,117,320,139,480,144C640,149,800,139,960,122.7C1120,107,1280,85,1360,74.7L1440,64L1440,160L1360,160C1280,160,1120,160,960,160C800,160,640,160,480,160C320,160,160,160,80,160L0,160Z"
            fill="url(#footerGradient)"
          />
        </svg>
      </div>

      {/* Footer */}
      <footer className="footer">
        <div className="footer-content">
          
          <div className="footer-section footer-brand">
            <img
              src="https://cdn-icons-png.flaticon.com/512/2103/2103633.png"
              alt="Journal Nexus Logo"
              className="footer-logo"
            />
            <h3>Journal Nexus</h3>
            <p>Advancing science through open access.</p>
          </div>

          <div className="footer-section">
            <h4>For Authors</h4>
            <ul>
              <li><a href="#">Submit a Manuscript</a></li>
              <li><a href="#">Author Guidelines</a></li>
              <li><a href="#">Publication Ethics</a></li>
              <li><a href="#">Copyright & Permissions</a></li>
              <li><a href="#">Open Access Options</a></li>
            </ul>
          </div>

          <div className="footer-section">
            <h4>For Reviewers</h4>
            <ul>
              <li><a href="#">Reviewer Guidelines</a></li>
              <li><a href="#">Become a Reviewer</a></li>
              <li><a href="#">Reviewer Recognition</a></li>
              <li><a href="#">Reviewer Resources</a></li>
            </ul>
          </div>

          <div className="footer-section">
            <h4>For Librarians</h4>
            <ul>
              <li><a href="#">Institutional Access</a></li>
              <li><a href="#">Subscription Options</a></li>
              <li><a href="#">Open Access Policy</a></li>
              <li><a href="#">Archive Access</a></li>
            </ul>
          </div>

          <div className="footer-section">
            <h4>About the Journal</h4>
            <ul>
              <li><a href="#">Editorial Board</a></li>
              <li><a href="#">Aims & Scope</a></li>
              <li><a href="#">Special Issues</a></li>
              <li><a href="#">Contact Us</a></li>
            </ul>
          </div>

          <div className="footer-section connect">
            <h4>Connect With Us</h4>
            <div className="social-links">
              <a href="https://x.com" target="_blank" aria-label="Twitter"><i className="fab fa-twitter"></i></a>
              <a href="https://linkedin.com" target="_blank" aria-label="LinkedIn"><i className="fab fa-linkedin"></i></a>
              <a href="https://facebook.com" target="_blank" aria-label="Facebook"><i className="fab fa-facebook"></i></a>
              <a href="https://instagram.com" target="_blank" aria-label="Instagram"><i className="fab fa-instagram"></i></a>
            </div>

            <div className="newsletter">
              <h4>Newsletter</h4>
              <div className="newsletter-form">
                <input type="email" placeholder="Your email" aria-label="Email" />
                <button type="button">Subscribe</button>
              </div>
            </div>
          </div>
        </div>

        <hr />

        <div className="footer-bottom">
          <div className="footer-bottom-content">
            <p>© 2025 Journal Nexus. All rights reserved.</p>
            <div className="footer-bottom-links">
              <a href="#">Privacy Policy</a>
              <a href="#">Terms of Use</a>
              <a href="#">Cookie Policy</a>
              <a href="#">Contact Us</a>
            </div>
          </div>
        </div>
      </footer>

    </div>
  );
};

export default Footer;
