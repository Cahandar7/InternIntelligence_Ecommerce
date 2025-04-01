import React, { useContext } from "react";
import CartTopBanner from "../components/CartTopBanner";
import { Link, useLocation } from "react-router-dom";
import { LanguageContext } from "../contexts/LanguageContext";

const OrderStatusPage = () => {
  const { language } = useContext(LanguageContext);
  const location_order = useLocation();
  const billingInfo = location_order.state?.billingInfo;
  const totalSum = location_order.state?.totalSum;
  const paymentMethod = location_order.state?.paymentMethod;
  const date_time = location_order.state?.date_time;

  const formattedDate = date_time
    ? new Date(date_time).toLocaleString("en-US", {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
      })
    : "Date not available";

  return (
    <div className="page">
      <CartTopBanner />
      <div
        style={{
          width: "100vw",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          marginBottom: "30px",
        }}
      >
        <div className="order-status">
          <div className="status">
            <h2>
              {language === "en"
                ? "Order Tracking"
                : language === "ru"
                ? "Отслеживание заказа"
                : "Sifarişin izlənməsi"}
            </h2>
            <h2>
              {!billingInfo
                ? language === "en"
                  ? "No Orders"
                  : language === "ru"
                  ? "Нет заказов"
                  : "Heç bir sifariş yoxdur"
                : language === "en"
                ? "Order Placed"
                : language === "ru"
                ? "Заказ размещен"
                : "Sifariş verildi"}
            </h2>
          </div>
          <hr />
          {!billingInfo ? (
            <div>
              {language === "en"
                ? "No billing information found"
                : language === "ru"
                ? "Информация о платеже не найдена"
                : "Ödəniş məlumatı tapılmadı"}
            </div>
          ) : (
            <>
              <div>
                <h2 style={{ marginBottom: "10px" }}>
                  {language === "en"
                    ? "Billing Information"
                    : language === "ru"
                    ? "Информация о платеже"
                    : "Ödəniş Məlumatları"}
                </h2>
                <div className="client-data">
                  <p>
                    {billingInfo.name} {billingInfo.surname}
                  </p>
                  <p>
                    {language === "en"
                      ? `PIN code: ${billingInfo.pincode}`
                      : language === "ru"
                      ? `Пин-код: ${billingInfo.pincode}`
                      : `FİN kod: ${billingInfo.pincode}`}
                  </p>
                  <p>
                    {billingInfo.email}, {billingInfo.phone}
                  </p>
                  <p>
                    {billingInfo["country-region"]}, {billingInfo["town-city"]},{" "}
                    {billingInfo.postcode}
                  </p>
                  <p>
                    {language === "en"
                      ? `Payment Method: ${paymentMethod}`
                      : language === "ru"
                      ? `Метод оплаты: ${paymentMethod}`
                      : `Ödeme Yöntemi: ${paymentMethod}`}
                  </p>
                  <p>{formattedDate}</p>
                </div>
              </div>
              <hr />
              <div className="total">
                <p>
                  {language === "en"
                    ? "Total"
                    : language === "ru"
                    ? "Итого"
                    : "Toplam"}
                </p>
                <span>
                  $
                  {new Intl.NumberFormat("en-US", {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  }).format(totalSum)}
                </span>
              </div>
            </>
          )}
          <div
            style={{
              width: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Link to={"/shop"} className="to-shopping">
              {language === "en"
                ? "Continue shopping"
                : language === "ru"
                ? "Продолжить покупки"
                : "Alışverişe devam et"}
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderStatusPage;
