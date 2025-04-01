import React, { useContext } from "react";
import {
  faCalendarDays,
  faMessage,
  faEye,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import { LanguageContext } from "../contexts/LanguageContext";

const BlogPageCard = ({ image, title, date, views, messages, desc }) => {
  const { language } = useContext(LanguageContext);

  return (
    <div className="blog-page-card">
      <div className="image-box">
        <img src={image} alt="Blog-Card" />
      </div>
      <div className="blog-card-texts">
        <h1>{title}</h1>
        <div className="blog-card-details">
          <FontAwesomeIcon className="icon" icon={faCalendarDays} />
          <span>{date} /</span>
          <FontAwesomeIcon className="icon" icon={faEye} />
          <span>{views} /</span>
          <FontAwesomeIcon className="icon" icon={faMessage} />
          <span>{messages}</span>
        </div>
        <p>{desc}</p>
        <Link to="/blog" className="blog-card-link">
          {language === "en"
            ? "Continue Reading"
            : language === "ru"
            ? "Читать дальше"
            : "Davamını oxu"}{" "}
          <span>{">"}</span>
        </Link>
      </div>
    </div>
  );
};

export default BlogPageCard;
