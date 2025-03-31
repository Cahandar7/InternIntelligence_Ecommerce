import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./assets/scss/style.scss";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import App from "./App.jsx";
import { Provider } from "react-redux";
import { CartProvider } from "react-use-cart";
import { WishlistProvider } from "./contexts/WishlistContext.jsx";
import LanguageProvider from "./contexts/LanguageContext.jsx";
import store from "./redux_tools/store/productStore.js";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
      <CartProvider>
        <WishlistProvider>
          <LanguageProvider>
            <App />
          </LanguageProvider>
        </WishlistProvider>
      </CartProvider>
    </Provider>
  </StrictMode>
);
