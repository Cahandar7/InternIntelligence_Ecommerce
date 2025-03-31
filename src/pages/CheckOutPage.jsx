import React, { useEffect, useRef, useState } from "react";
import CartTopBanner from "../components/CartTopBanner";
import { Col, Container, Dropdown, Row } from "react-bootstrap";
import axios from "axios";
import { useCart } from "react-use-cart";
import { useLocation, useNavigate } from "react-router-dom";

const CheckOutPage = () => {
  const [countries, setCountries] = useState([]);
  const [inputCountry, setInputCountry] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("Direct Bank Transfer");
  const loaction_ckeckout = useLocation();
  const totalSum = loaction_ckeckout.state?.totalSum;

  const { cartTotal, items } = useCart();
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
          <Col sm={12} md={7} lg={7} className="checkout-form">
            <h1>Billing Details</h1>
            <hr />
            <form
              className="checkout-form-container"
              ref={formRef}
              onSubmit={handleFormSubmit}
            >
              <div className="checkout-form-row">
                <div className="checkout-form-group">
                  <label htmlFor="name">First name *</label>
                  <input type="text" id="name" name="name" required />
                </div>

                <div className="checkout-form-group">
                  <label htmlFor="surname">Last name *</label>
                  <input type="text" id="surname" name="surname" required />
                </div>
              </div>

              <div className="checkout-form-group full-width">
                <label htmlFor="email">Email address *</label>
                <input type="email" id="email" name="email" required />
              </div>

              <div className="checkout-form-group full-width">
                <label htmlFor="phone">Phone number</label>
                <input type="tel" id="phone" name="phone" required />
              </div>

              <div className="checkout-form-group full-width">
                <label htmlFor="pincode">PIN code</label>
                <input type="tel" id="pincode" name="pincode" required />
              </div>

              <div className="checkout-form-group full-width">
                <label htmlFor="country-region">Country / Region *</label>
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
                <label htmlFor="town-city">Town / City *</label>
                <input
                  type="text"
                  id="town-city"
                  name="town-city"
                  required
                ></input>
              </div>

              <div className="checkout-form-group full-width">
                <label htmlFor="postcode">Postcode</label>
                <input
                  type="number"
                  id="postcode"
                  name="postcode"
                  required
                ></input>
              </div>
            </form>
          </Col>
          <Col sm={12} md={5} lg={5} className="checkout-bill">
            <h2>your order</h2>
            <hr />
            <div className="items-review">
              {items.map((item, index) => (
                <div>
                  <p key={index}>{item.title}</p>
                  <p key={index}>
                    {item.quantity} × ${item.price.toFixed(2)}
                  </p>
                  <p key={index}>Subtotal: ${item.itemTotal.toFixed(2)}</p>
                </div>
              ))}
            </div>
            <hr />
            <div className="subtotal">
              <p>Subtotal </p>
              <span>
                $
                {new Intl.NumberFormat("en-US", {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                }).format(cartTotal)}
              </span>
            </div>
            <div className="shipping">
              <p>Shipping </p>
              <span>+$5.00</span>
            </div>
            <div className="shipping">
              <p>Discounts </p>
              <span>
                -$
                {(cartTotal + 5 - totalSum).toFixed(2)}
              </span>
            </div>
            <div className="total">
              <p>total </p>
              <span>
                $
                {new Intl.NumberFormat("en-US", {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                }).format(totalSum)}
              </span>
            </div>
            <h2>payment method</h2>
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
                Direct Bank Transfer
                <div className="payment-description" id="bank-transfer-desc">
                  Make your payment directly into our bank account. Please use
                  your Order ID as the payment reference. Your order will not be
                  shipped until the funds have cleared in our account.
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
                Check Payments
                <div className="payment-description" id="check-payment-desc">
                  Please send a check to Store Name, Store Street, Store Town,
                  Store State / County, Store Postcode.
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
                Cash on Delivery
                <div className="payment-description" id="cash-on-delivery-desc">
                  Pay with cash upon delivery.
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
                PayPal
                <div className="payment-description" id="paypal-desc">
                  Pay via PayPal; you can pay with your credit card if you don’t
                  have a PayPal account.
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
                    What is PayPal?
                  </a>
                </div>
              </label>
            </div>
            <button
              type="button"
              className="to-checkout"
              onClick={handlePlaceOrderClick}
            >
              Place Order
            </button>
            <button
              type="button"
              className="to-shopping"
              onClick={() => {
                history.back();
              }}
            >
              Return to Cart
            </button>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default CheckOutPage;
