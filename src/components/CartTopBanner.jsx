import React from "react";
import { useLocation } from "react-router-dom";

const CartTopBanner = () => {
  const location = useLocation();

  const pathName = location.pathname.split("/").pop();

  const pageName = pathName.charAt(0).toUpperCase() + pathName.slice(1);

  return (
    <div className="cart-top-banner">
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
          shopping cart
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
          checkout
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
          order status
        </h1>
      </div>
    </div>
  );
};

export default CartTopBanner;
