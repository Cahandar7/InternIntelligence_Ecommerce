import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendarDays } from "@fortawesome/free-solid-svg-icons"; // Correct import for the calendar icon
import { faMessage } from "@fortawesome/free-solid-svg-icons/faMessage";
import { Link } from "react-router-dom";
import footer_payments from "../assets/images/footer-payments.png";

const Footer = () => {
  return (
    <div className="footer">
      <div className="top-footer">
        <div className="column1">
          <img src="src/assets/images/xstore_logo.png" alt="XStore Logo" />
          <p>
            This is easy to update text from footer widget area. Add here
            information about your store.
          </p>
          <div>
            <span>48 Park Avenue, </span>
            <span>New York NY 10016</span>
            <span>Email: youremail@site.com</span>
            <span>Phone: +1 408 996 1010</span>
          </div>
        </div>
        <div className="column2">
          <h5>USEFUL LINKS</h5>
          <hr />
          <div>
            <ul>
              <li>
                <Link to={"/"}>Home Page</Link>
              </li>
              <li>
                <Link to={"/about"}>About Us</Link>
              </li>
              <li>
                <Link to={"/contact"}>Contact Us</Link>
              </li>
              <li>
                <Link to={"/blog"}>Blog</Link>
              </li>
              <li>
                <Link to={"/faq"}>FAQs</Link>
              </li>
              <li>
                <Link to={"/account"}>My Account</Link>
              </li>
              <li>
                <Link to={"/"}>Conditions</Link>
              </li>
            </ul>
            <ul>
              <li>
                <Link to={"contact"}>London</Link>
              </li>
              <li>
                <Link to={"contact"}>San Francisco</Link>
              </li>
              <li>
                <Link to={"contact"}>New Orlean</Link>
              </li>
              <li>
                <Link to={"contact"}>Seattle</Link>
              </li>
              <li>
                <Link to={"contact"}>Portland</Link>
              </li>
              <li>
                <Link to={"contact"}>Stockholm</Link>
              </li>
              <li>
                <Link to={"contact"}>Hoffenheim</Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="column3">
          <h5>RECENT POSTS</h5>
          <hr />
          <div>
            <h3>Consectetur aliquet</h3>
            <h1>
              <FontAwesomeIcon icon={faCalendarDays} />
              February 17, 2016
              <FontAwesomeIcon icon={faMessage} />
              <span>0</span>
            </h1>
          </div>
          <div>
            <h3>Consectetur vestibulum aliquet</h3>
            <h1>
              <FontAwesomeIcon icon={faCalendarDays} />
              February 17, 2016
              <FontAwesomeIcon icon={faMessage} />
              <span>0</span>
            </h1>
          </div>
          <div>
            <h3>Ullamcorper vestibulum</h3>
            <h1>
              <FontAwesomeIcon icon={faCalendarDays} />
              February 17, 2016
              <FontAwesomeIcon icon={faMessage} />
              <span>0</span>
            </h1>
          </div>
        </div>
        <div className="column4">
          <h5>PRODUCT TAGS</h5>
          <hr />
          <div>
            <Link to={"/"} className="tag-link">
              accessories
            </Link>
            <Link to={"/"} className="tag-link">
              black
            </Link>
          </div>
          <div>
            <Link to={"/"} className="tag-link">
              look
            </Link>
            <Link to={"/"} className="tag-link">
              look2
            </Link>
            <Link to={"/"} className="tag-link">
              look3
            </Link>
          </div>
          <div>
            <Link to={"/"} className="tag-link">
              new
            </Link>
            <Link to={"/"} className="tag-link">
              sale
            </Link>
            <Link to={"/"} className="tag-link">
              week
            </Link>
          </div>
          <div>
            <Link to={"/"} className="tag-link">
              fashion
            </Link>
            <Link to={"/"} className="tag-link">
              illegal
            </Link>
          </div>
        </div>
      </div>
      <div className="sub-footer">
        <div className="foot text">
          <span>
            <p>Copyright © 2024 XStore theme. Created by 8theme - WordPress</p>
            <p>WooCommerce themes.</p>
          </span>
        </div>
        <div className="foot">
          <img src={footer_payments} alt="footer_payments_image" />
        </div>
      </div>
    </div>
  );
};

export default Footer;
