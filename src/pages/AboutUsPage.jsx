import React from "react";
import about_us_img1 from "../assets/images/about_us_img1.png";
import about_us_img2 from "../assets/images/about_us_img2.png";
import { NavLink } from "react-router-dom";

const AboutUsPage = () => {
  return (
    <div className="page">
      <div className="about-us-hero">
        <img src={about_us_img1} alt="about_us_img1" />
        <div className="hero-texts">
          <h6>
            <NavLink to={"/"} className="nav">
              Home
            </NavLink>
            &gt;
          </h6>
          <h3>About Us</h3>
        </div>
      </div>
      <div className="about-us-banner">
        <img src={about_us_img2} alt="about_us_img2" />
        <div className="banner-texts">
          <div className="texts">
            <div className="top-text">
              <h3>
                Core principles. Deleniti atque corrupti quos dolo reset
                Maecenas sce.
              </h3>
              <p>
                Etiam nulla nunc, aliquet vel metus nec, scelerisque tempus
                enim. Sed eget blandit lectus. Donec facilisis ornare turpis id
                pretium. Maecenas scelerisque interdum dolor in vestibulum.
                Proin euismod dui purus, non lacinia ligula luctus.
              </p>
            </div>
            <div className="midbot-text">
              <div className="left">
                <h5>
                  <span>.01</span>PASSION
                </h5>
                <p>
                  Etiam nulla nunc, aliquet vel metus nec, scelerisque tempus
                  enim. Sed eget blandit lectus. Donec facilisis ornare turpis
                  id pretium.
                </p>
              </div>
              <div className="right">
                <h5>
                  <span>.02</span>DILIGENCE
                </h5>
                <p>
                  Etiam nulla nunc, aliquet vel metus nec, scelerisque tempus
                  enim. Sed eget blandit lectus. Donec facilisis ornare turpis
                  id pretium.
                </p>
              </div>
            </div>
            <div className="midbot-text">
              <div className="left">
                <h5>
                  <span>.03</span>PRECISION
                </h5>
                <p>
                  Etiam nulla nunc, aliquet vel metus nec, scelerisque tempus
                  enim. Sed eget blandit lectus. Donec facilisis ornare turpis
                  id pretium.
                </p>
              </div>
              <div className="right">
                <h5>
                  <span>.04</span>INSPIRATION
                </h5>
                <p>
                  Etiam nulla nunc, aliquet vel metus nec, scelerisque tempus
                  enim. Sed eget blandit lectus. Donec facilisis ornare turpis
                  id pretium.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutUsPage;
