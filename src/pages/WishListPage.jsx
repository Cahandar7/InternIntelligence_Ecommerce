import React, { useContext } from "react";
import AnimatedTopHero from "../components/AnimatedTopHero";
import { Link, useNavigate } from "react-router-dom";
import { useWishlist } from "../contexts/WishlistContext";
import slugify from "slugify";
import { faEye, faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useCart } from "react-use-cart";
import { LanguageContext } from "../contexts/LanguageContext";
import { CurrencyContext } from "../contexts/CurrencyContext";
import { ThemeContext } from "../contexts/ThemeContext";

const WishListPage = () => {
  const { language } = useContext(LanguageContext);
  const { theme } = useContext(ThemeContext);

  const { removeFromWishlist, wishlistItems, wishlistIsEmpty, clearWishlist } =
    useWishlist();

  const { addItem } = useCart();
  const { convertCurrency } = useContext(CurrencyContext);

  const navigate = useNavigate();

  return (
    <div className="page">
      <AnimatedTopHero
        page={
          language === "en"
            ? "wishlist"
            : language === "ru"
            ? "список желаемого"
            : "arzu listəsi"
        }
      />
      {wishlistIsEmpty() ? (
        <div className="empty-cart-wishlist-div">
          <svg
            width="1em"
            height="1em"
            xmlns="http://www.w3.org/2000/svg"
            xmlns:xlink="http://www.w3.org/1999/xlink"
            x="0px"
            y="0px"
            viewBox="0 0 100 100"
            xml:space="preserve"
          >
            <path
              d="M99.5,31.5C98.4,17.2,86.3,5.7,71.9,5.3C63.8,5,55.6,8.5,50,14.5C44.3,8.4,36.4,5,28.1,5.3C13.7,5.7,1.6,17.2,0.5,31.5
       c-0.1,1.2-0.1,2.5-0.1,3.7c0.2,5.1,2.4,10.2,6.1,14.3l39.2,43.4c1.1,1.2,2.7,1.9,4.3,1.9c1.6,0,3.2-0.7,4.4-1.9l39.1-43.4
       c3.7-4.1,5.8-9.1,6.1-14.3C99.6,34,99.6,32.7,99.5,31.5z M49.6,89.2L10.5,45.8c-2.8-3.1-4.5-7-4.7-10.9c0-1,0-2,0.1-3
       C6.8,20.4,16.6,11,28.2,10.7c0.2,0,0.5,0,0.7,0c7.4,0,14.5,3.6,18.8,9.7c0.5,0.7,1.3,1.1,2.2,1.1s1.7-0.4,2.2-1.1
       c4.5-6.3,11.8-9.9,19.6-9.7c11.6,0.4,21.4,9.7,22.4,21.2c0.1,1,0.1,2,0.1,3v0c-0.2,3.9-1.8,7.8-4.7,10.9L50.4,89.2
       C50.2,89.4,49.7,89.3,49.6,89.2z"
            ></path>
          </svg>
          <h1 className="empty-cart-wishlist-h1">
            {language === "en"
              ? "YOUR WISHLIST IS EMPTY"
              : language === "ru"
              ? "ВАШ СПИСОК ЖЕЛАЕМОГО ПУСТ"
              : "SİZİN ARZU LİSTƏNİZ BOŞDUR"}
          </h1>
          <p className="empty-cart-wishlist-p">
            {language === "en"
              ? "We invite you to get acquainted with an assortment of our shop. Surely you can find something for yourself!"
              : language === "ru"
              ? "Приглашаем вас ознакомиться с ассортиментом нашего магазина. Наверняка вы найдете что-то для себя!"
              : "Sizi mağazamızın çeşidi ilə tanış olmağa dəvət edirik. Şübhəsiz ki, özünüzə uyğun bir şey tapa bilərsiniz!"}
          </p>
          <Link to={"/shop"} className="empty-cart-wishlis-btn">
            {language === "en"
              ? "RETURN TO SHOP"
              : language === "ru"
              ? "НАЗАД В МАГАЗИН"
              : "MAĞAZAYA QAYIT"}
          </Link>
        </div>
      ) : (
        <div
          className={`wishlist ${theme === "dark" ? "dark-wl" : "light-wl"}`}
        >
          <table className="table">
            <thead>
              <tr>
                <th scope="col">
                  {language === "en"
                    ? "Product"
                    : language === "ru"
                    ? "Продукт"
                    : "Məhsul"}
                </th>
                <th scope="col"></th>
                <th scope="col">
                  {language === "en"
                    ? "Price"
                    : language === "ru"
                    ? "Цена"
                    : "Qiymət"}
                </th>
                <th scope="col">
                  {language === "en"
                    ? "Stock Status"
                    : language === "ru"
                    ? "Статус на складе"
                    : "Saxlama vəziyyəti"}
                </th>
                <th scope="col" style={{ textAlign: "right" }}>
                  {language === "en"
                    ? "Action"
                    : language === "ru"
                    ? "Действие"
                    : "Əməliyyat"}
                </th>
              </tr>
            </thead>
            <tbody>
              {wishlistItems.map((item, index) => (
                <tr key={index}>
                  <td style={{ width: "5em" }}>
                    <img
                      src={item.image}
                      alt={item.title}
                      width="80"
                      style={{ cursor: "pointer" }}
                      onClick={() => navigate(`/shop/${slugify(item.title)}`)}
                    />
                  </td>

                  <td>
                    <p
                      style={{
                        fontSize: "16px",
                        color: "#ffffff",
                        marginBottom: "7px",
                      }}
                    >
                      {item.title}
                    </p>
                    <p style={{ fontSize: "16px" }}>
                      {language === "en" || language === "az"
                        ? "SKU: "
                        : "АРТИКУЛ: "}
                      <span style={{ fontSize: "14px", color: "#888888" }}>
                        0{item.sku}
                      </span>
                    </p>
                  </td>

                  <td
                    style={{
                      color: "#888888",
                    }}
                  >
                    {convertCurrency(item.price)}
                  </td>

                  <td style={{ color: "#888888" }}>
                    {item.stockStatus
                      ? language === "en"
                        ? "In stock"
                        : language === "ru"
                        ? "В наличии"
                        : "Anbarda"
                      : language === "en"
                      ? "Not in stock"
                      : language === "ru"
                      ? "Нет в наличии"
                      : "Anbarda deyil"}
                  </td>

                  <td>
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "flex-end",
                        gap: "7px",
                      }}
                    >
                      <div
                        className="icon-box"
                        onClick={() => {
                          navigate(`/shop/${slugify(item.title)}`);
                        }}
                      >
                        <FontAwesomeIcon
                          className="icon"
                          icon={faEye}
                          size="lg"
                        />
                      </div>
                      <button
                        className="add-cart-box-between-icons"
                        onClick={() => {
                          addItem(item);
                          window.location.assign("/cart");
                        }}
                      >
                        {language === "en"
                          ? "Add to cart"
                          : language === "ru"
                          ? "В корзину"
                          : "Səbətə əlavə et"}
                      </button>

                      <div
                        className="icon-box"
                        onClick={() => {
                          removeFromWishlist(item);
                        }}
                      >
                        <FontAwesomeIcon
                          className="icon"
                          icon={faTrashAlt}
                          size="lg"
                        />
                      </div>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div
            style={{
              width: "70%",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <button
              className="add-all-to-cart"
              onClick={() => {
                wishlistItems.map((item) => addItem(item));
                window.location.assign("/cart");
              }}
            >
              {language === "en"
                ? "Add all to cart"
                : language === "ru"
                ? "Добавить все в корзину"
                : "Hamısını səbətə əlavə et"}
            </button>

            <button
              className="clear-wishlist-btn"
              onClick={() => {
                clearWishlist();
              }}
            >
              <FontAwesomeIcon icon={faTrashAlt} className="trash-icon" />
              {language === "en"
                ? "Clear wishlist"
                : language === "ru"
                ? "Очистить список желаемого"
                : "Arzular siyahısını təmizlə"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default WishListPage;
