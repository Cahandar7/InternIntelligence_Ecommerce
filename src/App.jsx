import React from "react";
import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
import Header from "./layouts/Header";
import Footer from "./layouts/Footer";
import HomePage from "./pages/HomePage";
import AboutUsPage from "./pages/AboutUsPage";
import ShopPage from "./pages/ShopPage";
import ContactPage from "./pages/ContactPage";
import BlogPage from "./pages/BlogPage";
import FAQPage from "./pages/FAQPage";
import CartPage from "./pages/CartPage";
import WishListPage from "./pages/WishListPage";
import NotFoundPage from "./pages/NotFoundPage";
import ProductDetails from "./pages/ProductDetailsPage";
import CheckOutPage from "./pages/CheckOutPage";
import OrderStatusPage from "./pages/OrderStatusPage";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ResetPassword from "./pages/ResetPassword";
import AdminPanel from "./pages/AdminPanel";
import ProductsAPI from "./utils/ProductsAPI";
import ProtectedRoute from "./utils/ProtectedRoute";

const AppContent = () => {
  const location = useLocation();
  const isAdminPage = location.pathname.startsWith("/admin");

  return (
    <>
      {!isAdminPage && <Header />}
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<AboutUsPage />} />
        <Route path="/shop" element={<ShopPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/blog" element={<BlogPage />} />
        <Route path="/faq" element={<FAQPage />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/cart/checkout" element={<CheckOutPage />} />
        <Route
          path="/cart/checkout/order-status"
          element={<OrderStatusPage />}
        />
        <Route path="/wishlist" element={<WishListPage />} />
        <Route path="/account/login" element={<Login />} />
        <Route path="/account/register" element={<Register />} />
        <Route
          path="/account/login/reset-password"
          element={<ResetPassword />}
        />
        <Route path="/shop/:slug" element={<ProductDetails />} />
        <Route
          path="/admin"
          element={
            <ProtectedRoute>
              <AdminPanel />
            </ProtectedRoute>
          }
        />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
      {!isAdminPage && <Footer />}
    </>
  );
};

const App = () => {
  return (
    <BrowserRouter>
      <ProductsAPI />
      <AppContent />
    </BrowserRouter>
  );
};

export default App;
