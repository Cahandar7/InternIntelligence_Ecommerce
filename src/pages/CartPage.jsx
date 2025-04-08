import React, { useState, useEffect, useContext } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { useCart } from "react-use-cart";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import slugify from "slugify";
import Swal from "sweetalert2";
import CartTopBanner from "../components/CartTopBanner";
import supabase from "../supabase/supabaseClient";
import { LanguageContext } from "../contexts/LanguageContext";
import { CurrencyContext } from "../contexts/CurrencyContext";
import { ThemeContext } from "../contexts/ThemeContext";

const CartPage = () => {
  const { language } = useContext(LanguageContext);
  const { theme } = useContext(ThemeContext);
  const [inputPromo, setInputPromo] = useState("");
  const [promocodes, setPromocodes] = useState(["UNEC777", "TRY6C"]);
  const [discountApplied, setDiscountApplied] = useState(false);
  const [discountAmount, setDiscountAmount] = useState(0);
  const { convertCurrency } = useContext(CurrencyContext);

  const navigate = useNavigate();
  const {
    isEmpty,
    items,
    updateItemQuantity,
    removeItem,
    cartTotal,
    emptyCart,
  } = useCart();

  const applyPromoCode = (e) => {
    e.preventDefault();

    if (promocodes.includes(inputPromo)) {
      Swal.fire({
        title:
          language === "en"
            ? "Promo Code Applied!"
            : language === "ru"
            ? "Промокод применён!"
            : "Promo kodu tətbiq olundu!",
        text:
          language === "en"
            ? "Your discount has been successfully applied."
            : language === "ru"
            ? "Ваша скидка была успешно применена."
            : "Endiriminiz uğurla tətbiq olundu.",
        icon: "success",
      });

      setDiscountApplied(true);
      setDiscountAmount(cartTotal * 0.1);
    } else {
      Swal.fire({
        title:
          language === "en"
            ? "Invalid Promo Code"
            : language === "ru"
            ? "Недействительный промокод"
            : "Yanlış promo kodu",
        text:
          language === "en"
            ? "The promo code you entered is incorrect or expired. Please try again."
            : language === "ru"
            ? "Введённый промокод неверен или просрочен. Пожалуйста, попробуйте снова."
            : "Daxil etdiyiniz promo kod yanlışdır və ya müddəti bitib. Zəhmət olmasa, yenidən cəhd edin.",
        icon: "error",
      });
    }
  };

  const [user, setUser] = useState(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      setUser(data.session?.user);
    });

    const { data: authListener } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setUser(session?.user || null);
      }
    );

    return () => {
      authListener?.subscription.unsubscribe();
    };
  }, []);

  return (
    <div className="page">
      <CartTopBanner />
      <Container className={theme}>
        {isEmpty ? (
          <div className="empty-cart-wishlist-div">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="1em"
              height="1em"
              viewBox="0 0 24 24"
            >
              <path d="M23.76 4.248c-0.096-0.096-0.24-0.24-0.504-0.24h-18.48l-0.48-2.4c-0.024-0.288-0.384-0.528-0.624-0.528h-2.952c-0.384 0-0.624 0.264-0.624 0.624s0.264 0.648 0.624 0.648h2.424l2.328 11.832c0.312 1.608 1.848 2.856 3.48 2.856h11.28c0.384 0 0.624-0.264 0.624-0.624s-0.264-0.624-0.624-0.624h-11.16c-0.696 0-1.344-0.312-1.704-0.816l14.064-1.92c0.264 0 0.528-0.24 0.528-0.528l1.968-7.824v-0.024c-0.024-0.048-0.024-0.288-0.168-0.432zM22.392 5.184l-1.608 6.696-14.064 1.824-1.704-8.52h17.376zM8.568 17.736c-1.464 0-2.592 1.128-2.592 2.592s1.128 2.592 2.592 2.592c1.464 0 2.592-1.128 2.592-2.592s-1.128-2.592-2.592-2.592zM9.888 20.328c0 0.696-0.624 1.32-1.32 1.32s-1.32-0.624-1.32-1.32 0.624-1.32 1.32-1.32 1.32 0.624 1.32 1.32zM18.36 17.736c-1.464 0-2.592 1.128-2.592 2.592s1.128 2.592 2.592 2.592c1.464 0 2.592-1.128 2.592-2.592s-1.128-2.592-2.592-2.592zM19.704 20.328c0 0.696-0.624 1.32-1.32 1.32s-1.344-0.6-1.344-1.32 0.624-1.32 1.32-1.32 1.344 0.624 1.344 1.32z"></path>
            </svg>
            <h1 className="empty-cart-wishlist-h1">
              {language === "en"
                ? "Your Shopping Cart is Empty"
                : language === "ru"
                ? "Ваша корзина пуста"
                : "Sizin səbətiniz boşdur"}
            </h1>
            <p className="empty-cart-wishlist-p">
              {language === "en"
                ? "We invite you to get acquainted with an assortment of our shop. Surely you can find something for yourself!"
                : language === "ru"
                ? "Приглашаем вас ознакомиться с ассортиментом нашего магазина. Наверняка вы найдете что-то для себя!"
                : "Mağazamızın çeşidləri ilə tanış olmağa dəvət edirik. Əminik ki, özünüz üçün bir şey tapa bilərsiniz!"}
            </p>
            <Link to={"/shop"} className="empty-cart-wishlis-btn">
              {language === "en"
                ? "Return to Shop"
                : language === "ru"
                ? "Вернуться в магазин"
                : "Mağazaya qayıt"}
            </Link>
          </div>
        ) : (
          <Row className="mt-2 mb-5 mx-4">
            <Col sm={12} md={7} lg={8} className="cart-div">
              <table className="table">
                <thead>
                  <tr>
                    <th scope="col">
                      {language === "en"
                        ? "PRODUCT"
                        : language === "ru"
                        ? "ПРОДУКТ"
                        : "MƏHSUL"}
                    </th>
                    <th scope="col"></th>
                    <th scope="col">
                      {language === "en"
                        ? "PRICE"
                        : language === "ru"
                        ? "ЦЕНА"
                        : "QİYMƏT"}
                    </th>
                    <th scope="col">
                      {language === "en"
                        ? "SKU"
                        : language === "ru"
                        ? "АРТИКУЛ"
                        : "SKU"}
                    </th>
                    <th scope="col">
                      {language === "en"
                        ? "QUANTITY"
                        : language === "ru"
                        ? "КОЛИЧЕСТВО"
                        : "MİQDARI"}
                    </th>
                    <th scope="col">
                      {language === "en"
                        ? "SUBTOTAL"
                        : language === "ru"
                        ? "ПОДЫТОГ"
                        : "ARA CƏM"}
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {items.map((item, index) => (
                    <tr key={index}>
                      <td style={{ width: "5em" }}>
                        <img
                          src={item.image}
                          alt={item.title}
                          width="80"
                          style={{ cursor: "pointer" }}
                          onClick={() =>
                            navigate(`/shop/${slugify(item.title)}`)
                          }
                        />
                      </td>
                      <td>
                        <div
                          style={{
                            display: "flex",
                            alignItems: "flex-start",
                            flexDirection: "column",
                          }}
                        >
                          {item.title}
                          <button
                            className="delete-btn"
                            onClick={() => {
                              removeItem(item.id);
                              window.location.reload();
                            }}
                          >
                            {language === "en"
                              ? "Delete"
                              : language === "ru"
                              ? "Удалить"
                              : "Sil"}
                          </button>
                        </div>
                      </td>
                      <td>{convertCurrency(item.price)}</td>
                      <td style={{ opacity: "0.5" }}>0{item.sku}</td>
                      <td>
                        <div className="quantity-box">
                          <button
                            className="quantity-btn"
                            onClick={() =>
                              updateItemQuantity(item.id, item.quantity + 1)
                            }
                          >
                            +
                          </button>
                          <span className="quantity-count">
                            {item.quantity}
                          </span>
                          <button
                            className="quantity-btn"
                            onClick={() => {
                              if (item.quantity > 1) {
                                updateItemQuantity(item.id, item.quantity - 1);
                              } else {
                                removeItem(item.id);
                                window.location.reload();
                              }
                            }}
                          >
                            -
                          </button>
                        </div>
                      </td>
                      <td>{convertCurrency(item.price * item.quantity)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <div
                className={`promocode-clear-box ${
                  theme === "dark" ? "dark-pcb" : "light-pcb"
                }`}
              >
                <form onSubmit={applyPromoCode}>
                  <div className="promocode">
                    <input
                      type="text"
                      placeholder={
                        language === "en"
                          ? "Enter promocode"
                          : language === "ru"
                          ? "Введите промокод"
                          : "Promokodu daxil edin"
                      }
                      value={inputPromo}
                      onChange={(e) => setInputPromo(e.target.value)}
                      disabled={discountApplied}
                    />
                    <button type="submit" disabled={discountApplied}>
                      {discountApplied
                        ? language === "en"
                          ? "Applied"
                          : language === "ru"
                          ? "Применено"
                          : "Tətbiq edildi"
                        : "Ok"}
                    </button>
                  </div>
                </form>

                <button
                  className="clear-cart-btn"
                  onClick={() => {
                    emptyCart();
                    setInputPromo("");
                    setDiscountApplied(false);
                    setDiscountAmount(0);
                    window.location.reload();
                  }}
                >
                  <FontAwesomeIcon icon={faTrashAlt} className="trash-icon" />
                  {language === "en"
                    ? "Clear shopping cart"
                    : language === "ru"
                    ? "Очистить корзину"
                    : "Səbəti təmizlə"}
                </button>
              </div>
            </Col>
            <Col
              sm={12}
              md={5}
              lg={4}
              className={`cart-totals ${
                theme === "dark" ? "dark-ct" : "light-ct"
              }`}
            >
              <h2>
                {language === "en"
                  ? "Cart totals"
                  : language === "ru"
                  ? "Итоги корзины"
                  : "Səbətin cəmi"}
              </h2>

              <hr />

              <div className="subtotal">
                <p>
                  {language === "en"
                    ? "Subtotal"
                    : language === "ru"
                    ? "Подытог"
                    : "Ara cəm"}
                </p>
                <span>{convertCurrency(cartTotal)}</span>
              </div>

              <div className="shipping">
                <p>
                  {language === "en"
                    ? "Shipping"
                    : language === "ru"
                    ? "Доставка"
                    : "Çatdırılma"}
                </p>
                <span>
                  {language === "en"
                    ? "Flat Rate: "
                    : language === "ru"
                    ? "Фиксированная ставка: "
                    : "Sabit tarif: "}{" "}
                  {convertCurrency(5)}
                </span>
              </div>

              <div className="total">
                <p>
                  {language === "en"
                    ? "Total"
                    : language === "ru"
                    ? "Итого"
                    : "Ümumi"}
                </p>
                {discountApplied ? (
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      gap: "5px",
                    }}
                  >
                    <span className="line-through-p">
                      {convertCurrency(cartTotal + 5)}
                    </span>
                    <span>
                      {convertCurrency(cartTotal + 5 - discountAmount)}
                    </span>
                  </div>
                ) : (
                  <span>{convertCurrency(cartTotal + 5)}</span>
                )}
              </div>

              <button
                onClick={() => {
                  if (user) {
                    navigate("/cart/checkout", {
                      state: { totalSum: cartTotal + 5 - discountAmount },
                    });
                  } else {
                    Swal.fire({
                      title:
                        language === "en"
                          ? "Warning!"
                          : language === "ru"
                          ? "Предупреждение!"
                          : "Xəbərdarlıq!",
                      text:
                        language === "en"
                          ? "Login First"
                          : language === "ru"
                          ? "Сначала войдите"
                          : "Əvvəlcə daxil olun",
                      icon: "warning",
                      confirmButtonText:
                        language === "en"
                          ? "Login"
                          : language === "ru"
                          ? "Войти"
                          : "Giriş",
                    }).then((res) => {
                      if (res.isConfirmed) {
                        navigate("/account/login");
                      }
                    });
                  }
                }}
                className="to-checkout"
              >
                {language === "en"
                  ? "Proceed to checkout"
                  : language === "ru"
                  ? "Перейти к оформлению"
                  : "Ödənişə keç"}
              </button>

              <Link to={"/shop"} className="to-shopping">
                {language === "en"
                  ? "Continue shopping"
                  : language === "ru"
                  ? "Продолжить покупки"
                  : "Alış-verişə davam et"}
              </Link>
            </Col>
          </Row>
        )}
      </Container>
    </div>
  );
};

export default CartPage;
