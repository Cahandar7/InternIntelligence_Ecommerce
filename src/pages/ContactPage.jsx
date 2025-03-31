import React, { useState } from "react";
import AnimatedTopHero from "../components/AnimatedTopHero";

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    surname: "",
    email: "",
    phone: "",
    message: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form Data:", formData);
    setFormData({
      name: "",
      surname: "",
      email: "",
      phone: "",
      message: "",
    });
  };

  return (
    <div className="page">
      <AnimatedTopHero page={"contact"} />
      <div className="map-container">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d249179.66072117156!2d-74.259867!3d40.6976701!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c24a1a1a1a1a1b%3A0x1b0d7c87a9b1a8b9!2sNew+York+City!5e0!3m2!1sen!2sus!4v1647983493285!5m2!1sen!2sus"
          width="100%"
          height="450"
          style={{ border: "0" }}
          allowFullScreen=""
          loading="lazy"
          title="Google Map"
        />
      </div>
      <div className="contact-container">
        <form onSubmit={handleSubmit} className="form-container">
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="name">First name *</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="surname">Last name *</label>
              <input
                type="text"
                id="surname"
                name="surname"
                value={formData.surname}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="email">Email address *</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="phone">Phone number *</label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="form-group full-width">
            <label htmlFor="message">Your Message</label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              rows="4"
              required
            ></textarea>
          </div>

          <button type="submit" className="submit-btn">
            SEND MESSAGE
          </button>
        </form>
        <div className="contact-texts">
          <h2>Feel free to contact us anytime for support.</h2>
          <p>
            Our team is ready to assist with any inquiries you have. We provide
            great support and are here to help with any questions. Reach out to
            us for assistance—we're always available to help you.
          </p>
          <hr />
          <p>
            <span>30 South Avenue San Francisco</span>
            <span>Phone: +78 123 456 789</span>
            <span style={{ color: "#c62828" }}>
              Email:Support@lifestyle.com
            </span>
            <span style={{ color: "#c62828" }}>www.lifestyle.com</span>
          </p>
          <hr />
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
