import React, { useEffect, useRef, useState, useContext } from "react";
import CartTopBanner from "../components/CartTopBanner";
import { Col, Container, Dropdown, Row } from "react-bootstrap";
import axios from "axios";
import { useCart } from "react-use-cart";
import { useLocation, useNavigate } from "react-router-dom";
import { LanguageContext } from "../contexts/LanguageContext";
import { CurrencyContext } from "../contexts/CurrencyContext";
import { ThemeContext } from "../contexts/ThemeContext";

const CheckOutPage = () => {
  const { language } = useContext(LanguageContext);
  const { theme } = useContext(ThemeContext);
  const [countries, setCountries] = useState([]);
  const [inputCountry, setInputCountry] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("Direct Bank Transfer");
  const loaction_ckeckout = useLocation();
  const totalSum = loaction_ckeckout.state?.totalSum;
  const { convertCurrency } = useContext(CurrencyContext);

  const { cartTotal, items, emptyCart } = useCart();
  const formRef = useRef();
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("https://restcountries.com/v3.1/all")
      .then((res) => setCountries(res.data))
      .catch((err) => {
        console.log("Error:", err);
      });
  }, []);

  const handleSelectCountry = (eventKey) => {
    setInputCountry(eventKey);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(formRef.current);
    const formValues = Object.fromEntries(formData.entries());
    const date_time = new Date();
    navigate("/cart/checkout/order-status", {
      state: { billingInfo: formValues, totalSum, paymentMethod, date_time },
    });
  };

  const handlePlaceOrderClick = () => {
    const form = formRef.current;

    if (form.checkValidity()) {
      form.dispatchEvent(new Event("submit", { bubbles: true }));
      emptyCart();
      window.location.reload();
    } else {
      form.reportValidity();
    }
  };

  const handlePaymentMethodChange = (event) => {
    setPaymentMethod(event.target.value);
  };

  return (
    <div className="page">
      <CartTopBanner />
      <Container>
        <Row className="g-5 mb-4">
          <Col
            sm={12}
            md={7}
            lg={7}
            className={`checkout-form ${
              theme === "dark" ? "dark-cf" : "light-cf"
            }`}
          >
            <h1>
              {language === "en"
                ? "Billing Details"
                : language === "ru"
                ? "Платежные данные"
                : "Ödəmə məlumatları"}
            </h1>
            <hr />
            <form
              className="checkout-form-container"
              ref={formRef}
              onSubmit={handleFormSubmit}
            >
              <div className="checkout-form-row">
                <div className="checkout-form-group">
                  <label htmlFor="name">
                    {language === "en"
                      ? "First name *"
                      : language === "ru"
                      ? "Имя *"
                      : "Ad *"}
                  </label>
                  <input type="text" id="name" name="name" required />
                </div>

                <div className="checkout-form-group">
                  <label htmlFor="surname">
                    {language === "en"
                      ? "Last name *"
                      : language === "ru"
                      ? "Фамилия *"
                      : "Soyad *"}
                  </label>
                  <input type="text" id="surname" name="surname" required />
                </div>
              </div>

              <div className="checkout-form-group full-width">
                <label htmlFor="email">
                  {language === "en"
                    ? "Email address *"
                    : language === "ru"
                    ? "Электронная почта *"
                    : "E-poçt ünvanı *"}
                </label>
                <input type="email" id="email" name="email" required />
              </div>

              <div className="checkout-form-group full-width">
                <label htmlFor="phone">
                  {language === "en"
                    ? "Phone number"
                    : language === "ru"
                    ? "Номер телефона"
                    : "Telefon nömrəsi"}
                </label>
                <input type="tel" id="phone" name="phone" required />
              </div>

              <div className="checkout-form-group full-width">
                <label htmlFor="pincode">
                  {language === "en"
                    ? "PIN code"
                    : language === "ru"
                    ? "ПИН-код"
                    : "FİN kod"}
                </label>
                <input type="tel" id="pincode" name="pincode" required />
              </div>

              <div className="checkout-form-group full-width">
                <label htmlFor="country-region">
                  {language === "en"
                    ? "Country / Region *"
                    : language === "ru"
                    ? "Страна / Регион *"
                    : "Ölkə / Region *"}
                </label>
                <Dropdown onSelect={handleSelectCountry}>
                  <Dropdown.Toggle variant="dark" id="dropdown-basic">
                    <input
                      style={{ border: "none", width: "100%" }}
                      type="text"
                      id="country-region"
                      name="country-region"
                      value={inputCountry}
                      onChange={(e) => {
                        e.preventDefault();
                        setInputCountry(e.target.value);
                      }}
                      required
                    ></input>
                  </Dropdown.Toggle>

                  <Dropdown.Menu>
                    {countries
                      .filter((item) =>
                        item.name.common
                          .toLowerCase()
                          .startsWith(inputCountry.toLowerCase())
                      )
                      .map((item, index) => (
                        <Dropdown.Item
                          key={index}
                          eventKey={item.name.common}
                          style={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "space-between",
                          }}
                        >
                          {item.name.common}
                          <img
                            src={item.flags.png}
                            alt={item.name.common}
                            width={30}
                            height={15}
                          />
                        </Dropdown.Item>
                      ))}
                  </Dropdown.Menu>
                </Dropdown>
              </div>

              <div className="checkout-form-group full-width">
                <label htmlFor="town-city">
                  {language === "en"
                    ? "Town / City *"
                    : language === "ru"
                    ? "Город / Населенный пункт *"
                    : "Şəhər *"}
                </label>
                <input
                  type="text"
                  id="town-city"
                  name="town-city"
                  required
                ></input>
              </div>

              <div className="checkout-form-group full-width">
                <label htmlFor="postcode">
                  {language === "en"
                    ? "Postcode"
                    : language === "ru"
                    ? "Почтовый индекс"
                    : "Poçt indeksi"}
                </label>
                <input
                  type="number"
                  id="postcode"
                  name="postcode"
                  required
                ></input>
              </div>
            </form>
          </Col>

          <Col
            sm={12}
            md={5}
            lg={5}
            className={`checkout-bill ${
              theme === "dark" ? "dark-cb" : "light-cb"
            }`}
          >
            <h2>
              {language === "en"
                ? "Your order"
                : language === "ru"
                ? "Ваш заказ"
                : "Sizin sifarişiniz"}
            </h2>
            <hr />
            <div className="items-review">
              {items.map((item, index) => (
                <div>
                  <p key={index}>{item.title}</p>
                  <p key={index}>
                    {item.quantity} × {convertCurrency(item.price)}
                  </p>
                  <p key={index}>
                    {language === "en"
                      ? "Subtotal: "
                      : language === "ru"
                      ? "Подытог: "
                      : "Ümumi məbləğ: "}
                    {convertCurrency(item.itemTotal)}
                  </p>
                </div>
              ))}
            </div>
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
              <span>{convertCurrency(5)}</span>
            </div>
            <div className="shipping">
              <p>
                {language === "en"
                  ? "Discounts"
                  : language === "ru"
                  ? "Скидки"
                  : "Endirimlər"}
              </p>
              <span>{convertCurrency(cartTotal + 5 - totalSum)}</span>
            </div>
            <div className="total">
              <p>
                {language === "en"
                  ? "Total"
                  : language === "ru"
                  ? "Итого"
                  : "Ümumi"}
              </p>
              <span>{convertCurrency(totalSum)}</span>
            </div>
            <h2>
              {language === "en"
                ? "Payment Method"
                : language === "ru"
                ? "Способ оплаты"
                : "Ödəniş üsulu"}
            </h2>
            <hr />
            <div className="payment-method">
              <label>
                <input
                  type="radio"
                  name="payment-method"
                  value="Direct Bank Transfer"
                  className="payment-option"
                  checked={paymentMethod === "Direct Bank Transfer"}
                  onChange={handlePaymentMethodChange}
                />
                {language === "en"
                  ? "Direct Bank Transfer"
                  : language === "ru"
                  ? "Прямой банковский перевод"
                  : "Birbaşa Banka Köçürməsi"}
                <div className="payment-description" id="bank-transfer-desc">
                  {language === "en"
                    ? "Make your payment directly into our bank account. Please use your Order ID as the payment reference. Your order will not be shipped until the funds have cleared in our account."
                    : language === "ru"
                    ? "Переведите деньги напрямую на наш банковский счет. Пожалуйста, используйте ваш номер заказа в качестве ссылки для оплаты. Ваш заказ не будет отправлен, пока средства не поступят на наш счет."
                    : "Ödəməni birbaşa bank hesabımıza köçürün. Zəhmət olmasa, ödənişin istinad nömrəsi olaraq Sifariş ID-nizi istifadə edin. Ödəmə məbləği hesabımıza keçirilmədən sifarişiniz göndərilməyəcək."}
                </div>
              </label>

              <label>
                <input
                  type="radio"
                  name="payment-method"
                  value="Check Payments"
                  className="payment-option"
                  checked={paymentMethod === "Check Payments"}
                  onChange={handlePaymentMethodChange}
                />
                {language === "en"
                  ? "Check Payments"
                  : language === "ru"
                  ? "Оплата чеком"
                  : "Çeklə Ödəniş"}
                <div className="payment-description" id="check-payment-desc">
                  {language === "en"
                    ? "Please send a check to Store Name, Store Street, Store Town, Store State / County, Store Postcode."
                    : language === "ru"
                    ? "Пожалуйста, отправьте чек на имя магазина, улица магазина, город магазина, область/округ магазина, почтовый индекс магазина."
                    : "Zəhmət olmasa, çeki Mağaza Adı, Mağaza Küçəsi, Mağaza Şəhəri, Mağaza Dövlət/İlçe, Mağaza Poçt Kodu ünvanına göndərin."}
                </div>
              </label>

              <label>
                <input
                  type="radio"
                  name="payment-method"
                  value="Cash on Delivery"
                  className="payment-option"
                  checked={paymentMethod === "Cash on Delivery"}
                  onChange={handlePaymentMethodChange}
                />
                {language === "en"
                  ? "Cash on Delivery"
                  : language === "ru"
                  ? "Оплата при доставке"
                  : "Çatdırılma zamanı nağd ödəniş"}
                <div className="payment-description" id="cash-on-delivery-desc">
                  {language === "en"
                    ? "Pay with cash upon delivery."
                    : language === "ru"
                    ? "Оплатите наличными при доставке."
                    : "Çatdırılma zamanı nağd ödəniş edin."}
                </div>
              </label>

              <label>
                <input
                  type="radio"
                  name="payment-method"
                  value="PayPal"
                  className="payment-option"
                  checked={paymentMethod === "PayPal"}
                  onChange={handlePaymentMethodChange}
                />
                {language === "en"
                  ? "PayPal"
                  : language === "ru"
                  ? "PayPal"
                  : "PayPal"}
                <div className="payment-description" id="paypal-desc">
                  {language === "en"
                    ? "Pay via PayPal; you can pay with your credit card if you don’t have a PayPal account."
                    : language === "ru"
                    ? "Оплатите через PayPal; вы можете оплатить картой, если у вас нет аккаунта PayPal."
                    : "PayPal ilə ödəniş edin; əgər PayPal hesabınız yoxdursa, kredit kartınızla da ödəyə bilərsiniz."}
                  <img
                    src="https://www.paypalobjects.com/webstatic/mktg/Logo/AM_mc_vs_ms_ae_UK.png"
                    alt="PayPal Acceptance Mark"
                    className="me-3"
                  />
                  <a
                    href="https://www.paypal.com/az/home"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {language === "en"
                      ? "What is PayPal?"
                      : language === "ru"
                      ? "Что такое PayPal?"
                      : "PayPal nədir?"}
                  </a>
                </div>
              </label>
            </div>
            <button
              type="button"
              className="to-checkout"
              onClick={handlePlaceOrderClick}
            >
              {language === "en"
                ? "Place Order"
                : language === "ru"
                ? "Оформить заказ"
                : "Sifarişi təsdiqlə"}
            </button>
            <button
              type="button"
              className="to-shopping"
              onClick={() => {
                history.back();
              }}
            >
              {language === "en"
                ? "Return to Cart"
                : language === "ru"
                ? "Вернуться в корзину"
                : "Səbətə geri dön"}
            </button>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default CheckOutPage;
