import axios from "axios";
import React, { createContext, useState, useEffect } from "react";

export const CurrencyContext = createContext();

const CurrencyProvider = ({ children }) => {
  const [currency, setCurrency] = useState(
    localStorage.getItem("currency") || "USD"
  );
  const [rates, setRates] = useState({ USD: 1 });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    localStorage.setItem("currency", currency);
  }, [currency]);

  useEffect(() => {
    const fetchRates = async () => {
      try {
        const response = await axios.get(
          "https://v6.exchangerate-api.com/v6/dd8490688d2fe4453d3e5e67/latest/USD"
        );
        if (response) {
          setRates(response.data.conversion_rates);
        }
      } catch (error) {
        console.error("Error fetching exchange rates:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchRates();
  }, []);

  const convertCurrency = (amount) => {
    if (loading) return "Loading...";
    const rate = rates[currency] || 1;
    const symbol = currency === "USD" ? "$" : currency === "RUB" ? "₽" : "₼";

    return (
      <>
        {symbol}
        {new Intl.NumberFormat("en-US", {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        }).format(Math.floor(amount * rate).toFixed(2))}
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
