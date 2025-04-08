import React, { useState, useContext } from "react";
import AnimatedTopHero from "../components/AnimatedTopHero";
import { LanguageContext } from "../contexts/LanguageContext";
import { ThemeContext } from "../contexts/ThemeContext";

const ContactPage = () => {
  const { language } = useContext(LanguageContext);
  const { theme } = useContext(ThemeContext);

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
      <AnimatedTopHero
        page={
          language === "en"
            ? "Contact"
            : language === "ru"
            ? "Контакт"
            : "Əlaqə"
        }
      />
      <div className={`map-container ${theme}`}>
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
      <div className={`contact-container ${theme}`}>
        <form onSubmit={handleSubmit} className="form-container">
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="name">
                {language === "en"
                  ? "First name *"
                  : language === "ru"
                  ? "Имя *"
                  : "Ad *"}
              </label>
              <input
                style={theme === "dark" ? { color: "#fff" } : { color: "#000" }}
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="surname">
                {language === "en"
                  ? "Last name *"
                  : language === "ru"
                  ? "Фамилия *"
                  : "Soyad *"}
              </label>
              <input
                style={theme === "dark" ? { color: "#fff" } : { color: "#000" }}
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
              <label htmlFor="email">
                {language === "en"
                  ? "Email address *"
                  : language === "ru"
                  ? "Адрес электронной почты *"
                  : "E-poçt ünvanı *"}
              </label>
              <input
                style={theme === "dark" ? { color: "#fff" } : { color: "#000" }}
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="phone">
                {language === "en"
                  ? "Phone number *"
                  : language === "ru"
                  ? "Номер телефона *"
                  : "Telefon nömrəsi *"}
              </label>
              <input
                style={theme === "dark" ? { color: "#fff" } : { color: "#000" }}
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="form-group full-width">
            <label htmlFor="message">
              {language === "en"
                ? "Your Message"
                : language === "ru"
                ? "Ваше сообщение"
                : "Mesajınız"}
            </label>
            <textarea
              style={theme === "dark" ? { color: "#fff" } : { color: "#000" }}
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              rows="4"
              required
            ></textarea>
          </div>

          <button type="submit" className="submit-btn">
            {language === "en"
              ? "SEND MESSAGE"
              : language === "ru"
              ? "ОТПРАВИТЬ СООБЩЕНИЕ"
              : "MESAJ GÖNDƏR"}
          </button>
        </form>
        <div className="contact-texts">
          <h2>
            {language === "en"
              ? "Feel free to contact us anytime for support."
              : language === "ru"
              ? "Не стесняйтесь обращаться к нам в любое время за поддержкой."
              : "Bizə dəstək üçün istənilən vaxt müraciət edə bilərsiniz."}
          </h2>
          <p>
            {language === "en"
              ? "Our team is ready to assist with any inquiries you have. We provide great support and are here to help with any questions. Reach out to us for assistance—we're always available to help you."
              : language === "ru"
              ? "Наша команда готова помочь вам с любыми вопросами. Мы предоставляем отличную поддержку и готовы помочь вам с любыми вопросами. Обращайтесь к нам за помощью — мы всегда готовы помочь."
              : "Komandamız hər hansı bir sorğunuzla kömək etməyə hazırdır. Biz mükəmməl dəstək təqdim edirik və hər hansı bir sualla kömək etməyə hazırıq. Bizə müraciət edin — biz hər zaman kömək etməyə hazırıq."}
          </p>
          <hr />
          <p>
            <span>
              {language === "en"
                ? "30 South Avenue San Francisco"
                : language === "ru"
                ? "30 Южный проспект Сан-Франциско"
                : "30 Cənub Prospekti San-Fransisko"}
            </span>
            <span>
              {language === "en"
                ? "Phone: +78 123 456 789"
                : language === "ru"
                ? "Телефон: +78 123 456 789"
                : "Telefon: +78 123 456 789"}
            </span>
            <span style={{ color: "#c62828" }}>
              {language === "en"
                ? "Email:Support@lifestyle.com"
                : language === "ru"
                ? "Email:Support@lifestyle.com"
                : "E-poçt:Support@lifestyle.com"}
            </span>
            <span style={{ color: "#c62828" }}>
              {language === "en"
                ? "www.lifestyle.com"
                : language === "ru"
                ? "www.lifestyle.com"
                : "www.lifestyle.com"}
            </span>
          </p>
          <hr />
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
