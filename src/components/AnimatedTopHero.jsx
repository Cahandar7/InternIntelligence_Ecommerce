import React from "react";
import { Link } from "react-router-dom";

const AnimatedTopHero = ({ page, second_page }) => {
  return (
    <div className="hero-box">
      <Link to={"/"} className="hero-home">
        Home &gt;
      </Link>
      <span className="hero-page">
        {second_page ? page + " > " + second_page : page}
      </span>
      <div className="bg-effect"></div>
    </div>
  );
};

export default AnimatedTopHero;
