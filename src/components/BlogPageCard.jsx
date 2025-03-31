import {
  faCalendarDays,
  faMessage,
  faEye,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { Link } from "react-router-dom";

const BlogPageCard = ({ image, title, date, views, messages, desc }) => {
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
          Continue Reading <span>{">"}</span>
        </Link>
      </div>
    </div>
  );
};

export default BlogPageCard;
