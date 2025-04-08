import React, { useContext } from "react";
import { LanguageContext } from "../contexts/LanguageContext";
import { ThemeContext } from "../contexts/ThemeContext";
import { Link } from "react-router-dom";

const NotFoundPage = () => {
  const { language } = useContext(LanguageContext);
  const { theme } = useContext(ThemeContext);

  return (
    <div
      className={`not-found-container page ${
        theme === "dark" ? "dark-nfp" : "light-nfp"
      }`}
    >
      <h1 className="not-found-title">
        {language === "en"
          ? "Page Not Found"
          : language === "ru"
          ? "Страница не найдена"
          : "Səhifə Tapılmadı"}
      </h1>
      <p className="not-found-message">
        {language === "en"
          ? "It looks like nothing was found at this location. Try searching or click below to go back home."
          : language === "ru"
          ? "Похоже, что по этому адресу ничего не найдено. Попробуйте поискать или нажмите ниже, чтобы вернуться на главную."
          : "Bu yerdə heç nə tapılmadı. Axtarış etməyə çalışın və ya evə qayıtmaq üçün aşağıya klikləyin."}
      </p>
      <Link to={"/"} className="not-found-btn">
        {language === "en"
          ? "Back to Home"
          : language === "ru"
          ? "Вернуться на главную"
          : "Əsas səhifəyə qayıt"}
      </Link>
    </div>
  );
};

export default NotFoundPage;
