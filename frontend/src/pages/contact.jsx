import React, { useEffect } from "react";
// Optional: Load feather icons dynamically
const loadFeatherIcons = () => {
  const script = document.createElement("script");
  script.src = "https://cdnjs.cloudflare.com/ajax/libs/feather-icons/4.29.0/feather.min.js";
  script.async = true;
  script.onload = () => window.feather && window.feather.replace();
  document.body.appendChild(script);
};

const ContactUs = () => {
  useEffect(() => {
    loadFeatherIcons();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here (e.g., send to backend or email service)
    console.log("Form submitted");
  };

  return (
    <>
      {/* If header/footer are separate components, replace with <Header /> and <Footer /> */}
      {/* <div id="header"></div> */}

      <section className="contact-section">
        <div className="contact-header">
          <h2>Contact Us</h2>
          <p>If you have any questions or feedback, feel free to get in touch.</p>
        </div>

        <form className="contact-form" onSubmit={handleSubmit}>
          <div className="contact-row">
            <div className="contact-group">
              <label htmlFor="name">Name <span>*</span></label>
              <input type="text" id="name" name="name" placeholder="Your Name" required />
            </div>

            <div className="contact-group">
              <label htmlFor="email">Email ID <span>*</span></label>
              <input type="email" id="email" name="email" placeholder="Your Email" required />
            </div>
          </div>

          <div className="contact-row">
            <div className="contact-group">
              <label htmlFor="phone">Mobile No <span>*</span></label>
              <input type="tel" id="phone" name="phone" placeholder="Your Mobile Number" required />
            </div>

            <div className="contact-group">
              <label htmlFor="address">Address</label>
              <input type="text" id="address" name="address" placeholder="Your Address" />
            </div>
          </div>

          <div className="contact-group">
            <label htmlFor="message">Message <span>*</span></label>
            <textarea id="message" name="message" placeholder="Write your message here..." required />
          </div>

          <button type="submit" className="contact-submit-btn">
            <i className="fas fa-paper-plane"></i> Submit
          </button>
        </form>
      </section>

      <div id="footer-footer"></div>
    </>
  );
};

export default ContactUs;
