import React, { useContext } from "react";
import { useLocation } from "react-router-dom";
import { LanguageContext } from "../contexts/LanguageContext";
import { ThemeContext } from "../contexts/ThemeContext";

const CartTopBanner = () => {
  const location = useLocation();
  const { language } = useContext(LanguageContext);
  const { theme } = useContext(ThemeContext);

  const pathName = location.pathname.split("/").pop();

  const pageName = pathName.charAt(0).toUpperCase() + pathName.slice(1);

  return (
    <div
      className={`cart-top-banner ${
        theme === "dark" ? "dark-ctb" : "light-ctb"
      }`}
    >
      <div className="cart-top-banner-section">
        <div
          className={`${
            pageName.toLowerCase() === "cart" ||
            pageName.toLowerCase() === "checkout" ||
            pageName.toLowerCase() === "order-status"
              ? "circle-active"
              : "circle"
          }`}
        >
          1
        </div>
        <h1
          className={`${
            pageName.toLowerCase() === "cart" ||
            pageName.toLowerCase() === "checkout" ||
            pageName.toLowerCase() === "order-status"
              ? "banner-h1-active"
              : "banner-h1"
          }`}
        >
          {language === "en"
            ? "Shopping Cart"
            : language === "ru"
            ? "Корзина"
            : "Səbət"}
        </h1>
      </div>
      <div className="cart-top-banner-lines"></div>
      <div className="cart-top-banner-section">
        <div
          className={`${
            pageName.toLowerCase() === "checkout" ||
            pageName.toLowerCase() === "order-status"
              ? "circle-active"
              : "circle"
          }`}
        >
          2
        </div>
        <h1
          className={`${
            pageName.toLowerCase() === "checkout" ||
            pageName.toLowerCase() === "order-status"
              ? "banner-h1-active"
              : "banner-h1"
          }`}
        >
          {language === "en"
            ? "Checkout"
            : language === "ru"
            ? "Оформление заказа"
            : "Ödəniş"}
        </h1>
      </div>
      <div className="cart-top-banner-lines"></div>
      <div className="cart-top-banner-section">
        <div
          className={`${
            pageName.toLowerCase() === "order-status"
              ? "circle-active"
              : "circle"
          }`}
        >
          3
        </div>
        <h1
          className={`${
            pageName.toLowerCase() === "order-status"
              ? "banner-h1-active"
              : "banner-h1"
          }`}
        >
          {language === "en"
            ? "Order Status"
            : language === "ru"
            ? "Статус заказа"
            : "Sifarişin statusu"}
        </h1>
      </div>
    </div>
  );
};

export default CartTopBanner;
