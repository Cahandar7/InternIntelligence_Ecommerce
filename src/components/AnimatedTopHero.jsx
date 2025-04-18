import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { LanguageContext } from "../contexts/LanguageContext";
import { ThemeContext } from "../contexts/ThemeContext";

const AnimatedTopHero = ({ page, second_page }) => {
  const { language } = useContext(LanguageContext);
  const { theme } = useContext(ThemeContext);

  return (
    <div className={`hero-box ${theme === "dark" ? "dark-ath" : "light-ath"}`}>
      <Link to={"/"} className="hero-home">
        {language === "en"
          ? "Home >"
          : language === "ru"
          ? "Главная >"
          : "Ana Səhifə >"}
      </Link>

      <span className="hero-page">
        {second_page ? page + " > " + second_page : page}
      </span>
      <div className="bg-effect"></div>
    </div>
  );
};

export default AnimatedTopHero;
