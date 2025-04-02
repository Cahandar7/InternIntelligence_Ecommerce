import React, { createContext, useState, useEffect } from "react";

export const CurrencyContext = createContext();

const CurrencyProvider = ({ children }) => {
  const [currency, setCurrency] = useState(
    localStorage.getItem("currency") || "USD"
  );

  useEffect(() => {
    localStorage.setItem("currency", currency);
  }, [currency]);

  const rates = {
    USD: 1,
    RUB: 90,
    AZN: 1.7,
  };

  const convertCurrency = (amount) => {
    if (!rates[currency])
      return (
        <>
          {currency === "USD" ? "$ " : currency === "RUB " ? "₽ " : "₼"}{" "}
          {new Intl.NumberFormat("en-US", {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
          }).format(Number(amount).toFixed(2))}
        </>
      );
    return (
      <>
        {currency === "USD" ? "$" : currency === "RUB" ? "₽" : "₼"}
        {new Intl.NumberFormat("en-US", {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        }).format(Number(amount * rates[currency]).toFixed(2))}
      </>
    );
  };

  return (
    <CurrencyContext.Provider
      value={{ currency, setCurrency, convertCurrency }}
    >
      {children}
    </CurrencyContext.Provider>
  );
};

export default CurrencyProvider;
