import React from "react";
import CartTopBanner from "../components/CartTopBanner";
import { Link, useLocation } from "react-router-dom";

const OrderStatusPage = () => {
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
            <h2>order tracking</h2>
            <h2>{!billingInfo ? "No Orders" : "Order Placed"}</h2>
          </div>
          <hr />
          {!billingInfo ? (
            <div>No billing information found</div>
          ) : (
            <>
              <div>
                <h2 style={{ marginBottom: "10px" }}>Billing Information</h2>
                <div className="client-data">
                  <p>
                    {billingInfo.name} {billingInfo.surname}
                  </p>
                  <p>PIN code: {billingInfo.pincode}</p>
                  <p>
                    {billingInfo.email}, {billingInfo.phone}
                  </p>
                  <p>
                    {billingInfo["country-region"]}, {billingInfo["town-city"]},{" "}
                    {billingInfo.postcode}
                  </p>
                  <p>Payment Method: {paymentMethod}</p>
                  <p>{formattedDate}</p>
                </div>
              </div>
              <hr />
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
              Continue shopping
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderStatusPage;
