import React, { useContext, useEffect, useRef, useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Offcanvas from "react-bootstrap/Offcanvas";
import { motion, useMotionValueEvent, useScroll } from "framer-motion";
import slugify from "slugify";
import supabase from "../supabase/supabaseClient";
import { useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCartShopping,
  faHeart,
  faSignOut,
  faTruck,
  faUser,
  faUserCog,
  faBars,
  faMoon,
  faSun,
} from "@fortawesome/free-solid-svg-icons";
import xstore_logo from "../assets/images/xstore_logo.png";
import { useWishlist } from "../contexts/WishlistContext";
import Swal from "sweetalert2";
import { LanguageContext } from "../contexts/LanguageContext";
import { CurrencyContext } from "../contexts/CurrencyContext";
import { ThemeContext } from "../contexts/ThemeContext";

const Header = () => {
  const [totalUniqueItems, setTotalUniqueItems] = useState();
  const [hidden, setHidden] = useState(false);
  const [searchedProduct, setSearchedProduct] = useState();
  const [showInputResults, setShowInputResults] = useState(false);
  const products = useSelector((p) => p);
  const searchRef = useRef(null);
  const navigate = useNavigate();
  const { scrollY } = useScroll();
  const { wishlistItemsCount } = useWishlist();
  const { language, setLanguage } = useContext(LanguageContext);
  const { currency, setCurrency } = useContext(CurrencyContext);
  const { theme, setTheme } = useContext(ThemeContext);

  const [show, setShow] = useState(false);
  const [rotating, setRotating] = useState(false);

  const handleClose = () => setShow(false);
  const toggleShow = () => setShow((s) => !s);

  const toggleTheme = () => {
    setRotating(true);
    setTheme((prev) => (prev === "light" ? "dark" : "light"));

    // stop rotation animation after 500ms
    setTimeout(() => {
      setRotating(false);
    }, 500);
  };

  const languageNames = {
    en: "English",
    ru: "Русский",
    az: "Azərbaycan",
  };

  useMotionValueEvent(scrollY, "change", (latest) => {
    const prev = scrollY.getPrevious();
    if (latest > prev && latest > 120) {
      setTimeout(() => setHidden(true), 400);
    } else {
      setTimeout(() => setHidden(false), 400);
    }
  });

  useEffect(() => {
    const cartData = JSON.parse(localStorage.getItem("react-use-cart"));
    setTotalUniqueItems(cartData ? cartData.totalUniqueItems : 0);
  }, [totalUniqueItems]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setShowInputResults(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const filteredResults = products?.filter((item) =>
    item.title.toLowerCase().includes((searchedProduct || "").toLowerCase())
  );

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

  const handleLogout = async () => {
    localStorage.setItem("isAdmin", false);
    await supabase.auth.signOut();
    setUser(null);
    Swal.fire({
      title:
        language === "en"
          ? "Logged Out!"
          : language === "ru"
          ? "Вы вышли из аккаунта!"
          : "Çıxış edildi!",
      text:
        language === "en"
          ? "You have successfully logged out."
          : language === "ru"
          ? "Вы успешно вышли из аккаунта."
          : "Uğurla çıxış etdiniz.",
      icon: "success",
    }).then(() => window.location.reload());
  };

  return (
    <>
      <motion.header
        variants={{ visible: { y: 0 }, hidden: { y: "-100%" } }}
        animate={hidden ? "hidden" : "visible"}
        transition={{ duration: 0.5 }}
        className={`header ${theme}`}
      >
        <div className="small-header">
          <div className="header-sidebar">
            <button
              className="btn btn-dark"
              type="button"
              data-bs-toggle="offcanvas"
              data-bs-target="#offcanvasWithBothOptions"
              aria-controls="offcanvasWithBothOptions"
            >
              <FontAwesomeIcon icon={faBars}></FontAwesomeIcon>
            </button>
            <div
              className={`offcanvas offcanvas-start ${theme}`}
              data-bs-scroll="true"
              tabIndex={-1}
              id="offcanvasWithBothOptions"
              aria-labelledby="offcanvasWithBothOptionsLabel"
            >
              <img src={xstore_logo} alt="XStore Logo" />
              <form
                ref={searchRef}
                onSubmit={(e) => {
                  e.preventDefault();
                  if (searchedProduct.trim()) {
                    navigate(`/shop/${slugify(searchedProduct)}`);
                  }
                }}
              >
                <div
                  className={`search-box ${
                    theme === "dark" ? "dark-sb" : "light-sb"
                  }`}
                >
                  <input
                    style={
                      theme === "dark" ? { color: "#fff" } : { color: "#000" }
                    }
                    type="text"
                    placeholder={
                      language === "en"
                        ? "Type here..."
                        : language === "ru"
                        ? "Введите сюда..."
                        : "Buraya yazın..."
                    }
                    value={searchedProduct}
                    onChange={(e) => {
                      setSearchedProduct(e.target.value);
                      setShowInputResults(e.target.value.length > 0);
                    }}
                  />

                  <button
                    type="submit"
                    style={
                      theme === "dark"
                        ? { color: "#fff", backgroundColor: "#2f2f2f" }
                        : { color: "#000", backgroundColor: "#888888" }
                    }
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="17px"
                      height="17px"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M23.784 22.8l-6.168-6.144c1.584-1.848 2.448-4.176 2.448-6.576 0-5.52-4.488-10.032-10.032-10.032-5.52 0-10.008 4.488-10.008 10.008s4.488 10.032 10.032 10.032c2.424 0 4.728-0.864 6.576-2.472l6.168 6.144c0.144 0.144 0.312 0.216 0.48 0.216s0.336-0.072 0.456-0.192c0.144-0.12 0.216-0.288 0.24-0.48 0-0.192-0.072-0.384-0.192-0.504zM18.696 10.080c0 4.752-3.888 8.64-8.664 8.64-4.752 0-8.64-3.888-8.64-8.664 0-4.752 3.888-8.64 8.664-8.64s8.64 3.888 8.64 8.664z"></path>
                    </svg>
                  </button>
                  {showInputResults && filteredResults.length > 0 && (
                    <div className="search-results">
                      {filteredResults.map((product, index) => (
                        <Link
                          key={index}
                          className="link"
                          to={`/shop/${slugify(product.title)}`}
                          onClick={() => setShowInputResults(false)}
                        >
                          {product.title}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              </form>
              <div>
                <div className="dropdown">
                  <button
                    className="dropdown-toggle"
                    type="button"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                    style={
                      theme === "dark" ? { color: "#fff" } : { color: "#000" }
                    }
                  >
                    {languageNames[language] || ""}
                  </button>
                  <ul className={`dropdown-menu ${theme}`}>
                    <li>
                      <button
                        className="dropdown-item"
                        style={
                          theme === "dark"
                            ? { color: "#fff" }
                            : { color: "#000" }
                        }
                        onClick={() => {
                          setLanguage("en");
                        }}
                      >
                        {language === "en"
                          ? "English"
                          : language === "ru"
                          ? "Английкий"
                          : "İnglis"}
                      </button>
                    </li>
                    <li>
                      <button
                        style={
                          theme === "dark"
                            ? { color: "#fff" }
                            : { color: "#000" }
                        }
                        className="dropdown-item"
                        onClick={() => {
                          setLanguage("ru");
                        }}
                      >
                        {language === "en"
                          ? "Russian"
                          : language === "ru"
                          ? "Русский"
                          : "Rus"}
                      </button>
                    </li>
                    <li>
                      <button
                        className="dropdown-item"
                        style={
                          theme === "dark"
                            ? { color: "#fff" }
                            : { color: "#000" }
                        }
                        onClick={() => {
                          setLanguage("az");
                        }}
                      >
                        {language === "en"
                          ? "Azerbaijan"
                          : language === "ru"
                          ? "Азербайджан"
                          : "Azərbaycan"}
                      </button>
                    </li>
                  </ul>
                </div>

                <span
                  className="split-stick"
                  style={
                    theme === "dark"
                      ? { backgroundColor: "#fff" }
                      : { backgroundColor: "#000" }
                  }
                ></span>

                <div className="dropdown">
                  <button
                    className="dropdown-toggle"
                    type="button"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                    style={
                      theme === "dark" ? { color: "#fff" } : { color: "#000" }
                    }
                  >
                    {currency}
                  </button>
                  <ul className={`dropdown-menu ${theme}`}>
                    <li>
                      <button
                        className="dropdown-item"
                        style={
                          theme === "dark"
                            ? { color: "#fff" }
                            : { color: "#000" }
                        }
                        onClick={() => setCurrency("USD")}
                      >
                        USD
                      </button>
                    </li>
                    <li>
                      <button
                        className="dropdown-item"
                        style={
                          theme === "dark"
                            ? { color: "#fff" }
                            : { color: "#000" }
                        }
                        onClick={() => setCurrency("RUB")}
                      >
                        RUB
                      </button>
                    </li>
                    <li>
                      <button
                        className="dropdown-item"
                        style={
                          theme === "dark"
                            ? { color: "#fff" }
                            : { color: "#000" }
                        }
                        onClick={() => setCurrency("AZN")}
                      >
                        AZN
                      </button>
                    </li>
                  </ul>
                </div>

                <span
                  className="split-stick"
                  style={
                    theme === "dark"
                      ? { backgroundColor: "#fff" }
                      : { backgroundColor: "#000" }
                  }
                ></span>

                <div className="dropdown">
                  <button
                    className="dropdown-toggle"
                    type="button"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                    style={
                      theme === "dark" ? { color: "#fff" } : { color: "#000" }
                    }
                  >
                    {theme}
                  </button>
                  <ul className={`dropdown-menu ${theme}`}>
                    <li>
                      <button
                        className="dropdown-item"
                        style={
                          theme === "dark"
                            ? { color: "#fff" }
                            : { color: "#000" }
                        }
                        onClick={() => setTheme("dark")}
                      >
                        dark
                      </button>
                    </li>
                    <li>
                      <button
                        className="dropdown-item"
                        style={
                          theme === "dark"
                            ? { color: "#fff" }
                            : { color: "#000" }
                        }
                        onClick={() => setTheme("light")}
                      >
                        light
                      </button>
                    </li>
                  </ul>
                </div>
              </div>
              <nav>
                <ul>
                  <li>
                    <NavLink
                      to={"/"}
                      className={({ isActive }) =>
                        isActive ? "navlink navlink-active" : "navlink"
                      }
                      style={
                        theme === "dark" ? { color: "#fff" } : { color: "#000" }
                      }
                    >
                      {language === "en"
                        ? "Home"
                        : language === "ru"
                        ? "Главная"
                        : "Ana səhifə"}
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      to={"/shop"}
                      className={({ isActive }) =>
                        isActive ? "navlink navlink-active" : "navlink"
                      }
                      style={
                        theme === "dark" ? { color: "#fff" } : { color: "#000" }
                      }
                    >
                      {language === "en"
                        ? "Shop"
                        : language === "ru"
                        ? "Магазин"
                        : "Mağaza"}
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      to={"/about"}
                      className={({ isActive }) =>
                        isActive ? "navlink navlink-active" : "navlink"
                      }
                      style={
                        theme === "dark" ? { color: "#fff" } : { color: "#000" }
                      }
                    >
                      {language === "en"
                        ? "About Us"
                        : language === "ru"
                        ? "О нас"
                        : "Haqqımızda"}
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      to={"/contact"}
                      className={({ isActive }) =>
                        isActive ? "navlink navlink-active" : "navlink"
                      }
                      style={
                        theme === "dark" ? { color: "#fff" } : { color: "#000" }
                      }
                    >
                      {language === "en"
                        ? "Contact Us"
                        : language === "ru"
                        ? "Контакты"
                        : "Əlaqə"}
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      to={"/blog"}
                      className={({ isActive }) =>
                        isActive ? "navlink navlink-active" : "navlink"
                      }
                      style={
                        theme === "dark" ? { color: "#fff" } : { color: "#000" }
                      }
                    >
                      {language === "en"
                        ? "Blog"
                        : language === "ru"
                        ? "Блог"
                        : "Bloq"}
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      to={"/faq"}
                      className={({ isActive }) =>
                        isActive ? "navlink navlink-active" : "navlink"
                      }
                      style={
                        theme === "dark" ? { color: "#fff" } : { color: "#000" }
                      }
                    >
                      FAQ
                    </NavLink>
                  </li>
                </ul>
              </nav>
            </div>
          </div>

          <img src={xstore_logo} alt="XStore Logo" />

          <Link to={"/cart"} className="link">
            <FontAwesomeIcon
              className="header-icon"
              style={theme === "dark" ? { color: "#fff" } : { color: "#000" }}
              icon={faCartShopping}
            />
            <div className="index">{totalUniqueItems}</div>
          </Link>
        </div>
        <div className="top-h">
          <div className="top-h-left">
            <div className="dropdown">
              <button
                className="dropdown-toggle"
                type="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
                style={theme === "dark" ? { color: "#fff" } : { color: "#000" }}
              >
                {languageNames[language] || ""}
              </button>
              <ul className={`dropdown-menu ${theme}`}>
                <li>
                  <button
                    className="dropdown-item"
                    style={
                      theme === "dark" ? { color: "#fff" } : { color: "#000" }
                    }
                    onClick={() => {
                      setLanguage("en");
                    }}
                  >
                    {language === "en"
                      ? "English"
                      : language === "ru"
                      ? "Английкий"
                      : "İnglis"}
                  </button>
                </li>
                <li>
                  <button
                    style={
                      theme === "dark" ? { color: "#fff" } : { color: "#000" }
                    }
                    className="dropdown-item"
                    onClick={() => {
                      setLanguage("ru");
                    }}
                  >
                    {language === "en"
                      ? "Russian"
                      : language === "ru"
                      ? "Русский"
                      : "Rus"}
                  </button>
                </li>
                <li>
                  <button
                    className="dropdown-item"
                    style={
                      theme === "dark" ? { color: "#fff" } : { color: "#000" }
                    }
                    onClick={() => {
                      setLanguage("az");
                    }}
                  >
                    {language === "en"
                      ? "Azerbaijan"
                      : language === "ru"
                      ? "Азербайджан"
                      : "Azərbaycan"}
                  </button>
                </li>
              </ul>
            </div>

            <span
              className="split-stick"
              style={
                theme === "dark"
                  ? { backgroundColor: "#fff" }
                  : { backgroundColor: "#000" }
              }
            ></span>

            <div className="dropdown">
              <button
                className="dropdown-toggle"
                type="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
                style={theme === "dark" ? { color: "#fff" } : { color: "#000" }}
              >
                {currency}
              </button>
              <ul className={`dropdown-menu ${theme}`}>
                <li>
                  <button
                    className="dropdown-item"
                    style={
                      theme === "dark" ? { color: "#fff" } : { color: "#000" }
                    }
                    onClick={() => setCurrency("USD")}
                  >
                    USD
                  </button>
                </li>
                <li>
                  <button
                    className="dropdown-item"
                    style={
                      theme === "dark" ? { color: "#fff" } : { color: "#000" }
                    }
                    onClick={() => setCurrency("RUB")}
                  >
                    RUB
                  </button>
                </li>
                <li>
                  <button
                    className="dropdown-item"
                    style={
                      theme === "dark" ? { color: "#fff" } : { color: "#000" }
                    }
                    onClick={() => setCurrency("AZN")}
                  >
                    AZN
                  </button>
                </li>
              </ul>
            </div>

            <span
              className="split-stick"
              style={
                theme === "dark"
                  ? { backgroundColor: "#fff" }
                  : { backgroundColor: "#000" }
              }
            ></span>

            <button
              onClick={toggleTheme}
              className={`theme-toggle-button ${rotating ? "rotating" : ""}`}
              aria-label="Toggle theme"
            >
              <FontAwesomeIcon icon={theme === "dark" ? faSun : faMoon} />
            </button>
          </div>
          <div className="top-h-center">
            <div
              id="carouselExampleAutoplay"
              className="carousel slide"
              data-bs-ride="carousel"
              data-bs-interval="3000"
            >
              <div className="carousel-inner">
                <div className="carousel-item active">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="1em"
                    height="1em"
                    viewBox="0 0 24 24"
                  >
                    <path d="M23.448 7.248h-3.24v-1.032c0-0.528-0.432-0.96-0.96-0.96h-11.784c-0.528 0-0.96 0.432-0.96 0.96v2.304h-3.048c0 0 0 0 0 0-0.192 0-0.384 0.096-0.48 0.264l-1.56 2.736h-0.864c-0.312 0-0.552 0.24-0.552 0.552v4.416c0 0.288 0.24 0.552 0.552 0.552h1.032c0.264 1.032 1.176 1.728 2.208 1.728 0.144 0 0.288-0.024 0.432-0.048 0.888-0.168 1.584-0.816 1.8-1.68h1.032c0.048 0 0.12-0.024 0.168-0.024 0.072 0.024 0.168 0.024 0.24 0.024h5.040c0.288 1.176 1.44 1.92 2.64 1.68 0.888-0.168 1.584-0.816 1.8-1.68h2.328c0.528 0 0.96-0.432 0.96-0.96v-3.48h2.4c0.312 0 0.552-0.24 0.552-0.552s-0.24-0.552-0.552-0.552h-2.4v-1.032h0.288c0.312 0 0.552-0.24 0.552-0.552s-0.24-0.552-0.552-0.552h-0.288v-1.032h3.24c0.312 0 0.552-0.24 0.552-0.552-0.024-0.288-0.264-0.528-0.576-0.528zM16.848 7.8c0 0.312 0.24 0.552 0.552 0.552h1.728v1.032h-4.68c-0.312 0-0.552 0.24-0.552 0.552s0.24 0.552 0.552 0.552h4.656v1.032h-2.568c-0.144 0-0.288 0.048-0.384 0.168-0.096 0.096-0.168 0.24-0.168 0.384 0 0.312 0.24 0.552 0.552 0.552h2.544v3.312h-2.16c-0.144-0.552-0.456-1.008-0.936-1.344-0.504-0.336-1.104-0.48-1.704-0.36-0.888 0.168-1.584 0.816-1.8 1.68l-4.92-0.024 0.024-9.552 11.496 0.024v0.888h-1.728c-0.264 0-0.504 0.24-0.504 0.552zM14.712 15.288c0.648 0 1.2 0.528 1.2 1.2 0 0.648-0.528 1.2-1.2 1.2-0.648 0-1.2-0.528-1.2-1.2 0.024-0.672 0.552-1.2 1.2-1.2zM3.792 15.288c0.648 0 1.2 0.528 1.2 1.2 0 0.648-0.528 1.2-1.2 1.2s-1.2-0.528-1.2-1.2c0.024-0.672 0.552-1.2 1.2-1.2zM6.48 12.6v3.312h-0.48c-0.144-0.552-0.456-1.008-0.936-1.344-0.504-0.336-1.104-0.48-1.704-0.36-0.888 0.168-1.584 0.816-1.8 1.68h-0.48v-3.288h5.4zM6.48 9.624v1.896h-3.792l1.080-1.872h2.712z"></path>
                  </svg>
                  <span className="ms-1">
                    {language === "en"
                      ? "Take 30% off when you spend $120 "
                      : language === "ru"
                      ? "Получите скидку 30% при покупке от $120 "
                      : "$120 xərclədikdə 30% endirim əldə edin "}
                    <Link
                      to={"/shop"}
                      className="carousel-links"
                      style={
                        theme === "dark" ? { color: "#fff" } : { color: "#000" }
                      }
                    >
                      {language === "en"
                        ? "Go shop"
                        : language === "ru"
                        ? "Перейти в магазин"
                        : "Mağazaya get"}
                    </Link>
                  </span>
                </div>
                <div className="carousel-item">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="1em"
                    height="1em"
                    viewBox="0 0 24 24"
                  >
                    <path d="M23.5 9.5c0.276 0 0.5-0.224 0.5-0.5v-4c0-0.276-0.224-0.5-0.5-0.5h-23c-0.276 0-0.5 0.224-0.5 0.5v4c0 0.276 0.224 0.5 0.5 0.5 1.379 0 2.5 1.122 2.5 2.5s-1.121 2.5-2.5 2.5c-0.276 0-0.5 0.224-0.5 0.5v4c0 0.276 0.224 0.5 0.5 0.5h23c0.276 0 0.5-0.224 0.5-0.5v-4c0-0.276-0.224-0.5-0.5-0.5-1.379 0-2.5-1.122-2.5-2.5s1.121-2.5 2.5-2.5zM20 12c0 1.76 1.306 3.221 3 3.464v3.036h-22v-3.036c1.694-0.243 3-1.704 3-3.464s-1.306-3.221-3-3.464v-3.036h22v3.036c-1.694 0.243-3 1.704-3 3.464zM6.5 10.5c-0.276 0-0.5 0.224-0.5 0.5v2c0 0.276 0.224 0.5 0.5 0.5s0.5-0.224 0.5-0.5v-2c-0-0.276-0.224-0.5-0.5-0.5zM6.5 6.5c-0.276 0-0.5 0.224-0.5 0.5v2c0 0.276 0.224 0.5 0.5 0.5s0.5-0.224 0.5-0.5v-2c-0-0.276-0.224-0.5-0.5-0.5zM6.5 14.5c-0.276 0-0.5 0.224-0.5 0.5v2c0 0.276 0.224 0.5 0.5 0.5s0.5-0.224 0.5-0.5v-2c-0-0.276-0.224-0.5-0.5-0.5zM17.5 10.5c-0.276 0-0.5 0.224-0.5 0.5v2c0 0.276 0.224 0.5 0.5 0.5s0.5-0.224 0.5-0.5v-2c0-0.276-0.224-0.5-0.5-0.5zM17.5 6.5c-0.276 0-0.5 0.224-0.5 0.5v2c0 0.276 0.224 0.5 0.5 0.5s0.5-0.224 0.5-0.5v-2c0-0.276-0.224-0.5-0.5-0.5zM17.5 14.5c-0.276 0-0.5 0.224-0.5 0.5v2c0 0.276 0.224 0.5 0.5 0.5s0.5-0.224 0.5-0.5v-2c0-0.276-0.224-0.5-0.5-0.5z"></path>
                  </svg>
                  <span className="ms-1">
                    {language === "en"
                      ? "Free 2-days standard shipping on orders $255+"
                      : language === "ru"
                      ? "Бесплатная доставка за 2 дня на заказы от $255"
                      : "$255-dən yuxarı sifarişlərə pulsuz 2 günlük standart çatdırılma"}
                    <span
                      className="carousel-links"
                      style={
                        theme === "dark" ? { color: "#fff" } : { color: "#000" }
                      }
                    >
                      {language === "en"
                        ? "Custom link"
                        : language === "ru"
                        ? "Пользовательская ссылка"
                        : "Xüsusi bağlantı"}
                    </span>
                  </span>
                </div>
              </div>
              <button
                className="carousel-control-prev"
                type="button"
                data-bs-target="#carouselExampleAutoplay"
                data-bs-slide="prev"
              >
                <span
                  className="carousel-control-prev-icon"
                  aria-hidden="true"
                ></span>
                <span className="visually-hidden">Previous</span>
              </button>
              <button
                className="carousel-control-next"
                type="button"
                data-bs-target="#carouselExampleAutoplay"
                data-bs-slide="next"
              >
                <span
                  className="carousel-control-next-icon"
                  aria-hidden="true"
                ></span>
                <span className="visually-hidden">Next</span>
              </button>
            </div>
          </div>
          <div className="top-h-right">
            <svg
              version="1.1"
              xmlns="http://www.w3.org/2000/svg"
              width="1em"
              height="1em"
              viewBox="0 0 24 24"
            >
              <path d="M23.928 5.424c-0.024-0.648-0.552-1.152-1.176-1.152h-21.504c-0.648 0-1.176 0.528-1.176 1.176v13.128c0 0.648 0.528 1.176 1.176 1.176h21.504c0.648 0 1.176-0.528 1.176-1.176v-13.152zM22.512 5.4l-10.512 6.576-10.512-6.576h21.024zM1.248 16.992v-10.416l7.344 4.584-7.344 5.832zM1.224 18.456l8.352-6.624 2.064 1.32c0.192 0.12 0.432 0.12 0.624 0l2.064-1.32 8.4 6.648 0.024 0.096c0 0 0 0.024-0.024 0.024h-21.48c-0.024 0-0.024 0-0.024-0.024v-0.12zM22.752 6.648v10.344l-7.344-5.808 7.344-4.536z"></path>
            </svg>
            <Link
              to={"/blog"}
              className="ms-1 hover-els"
              style={theme === "dark" ? { color: "#fff" } : { color: "#000" }}
            >
              {language === "en"
                ? "Newsletter"
                : language === "ru"
                ? "Рассылка"
                : "Bülleten"}
            </Link>
            <span
              className="split-stick"
              style={
                theme === "dark"
                  ? { backgroundColor: "#fff" }
                  : { backgroundColor: "#000" }
              }
            ></span>
            <div
              className="top-h-order-status"
              onClick={() => {
                if (user) {
                  navigate("/cart/checkout/order-status");
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
                        ? "Войдите в систему"
                        : "Əvvəlcə daxil olun",
                    icon: "warning",
                    confirmButtonText:
                      language === "en"
                        ? "Login"
                        : language === "ru"
                        ? "Войти"
                        : "Daxil ol",
                  }).then((res) => {
                    if (res.isConfirmed) {
                      navigate("/account/login");
                    }
                  });
                }
              }}
            >
              <FontAwesomeIcon
                icon={faTruck}
                style={{ marginRight: "4px", width: "14px", height: "14px" }}
              />
              {language === "en"
                ? "Order Status"
                : language === "ru"
                ? "Статус заказа"
                : "Sifarişin vəziyyəti"}
            </div>
          </div>
        </div>
        <div className="middle-h">
          <div className="middle-h-left">
            <form
              ref={searchRef}
              onSubmit={(e) => {
                e.preventDefault();
                if (searchedProduct.trim()) {
                  navigate(`/shop/${slugify(searchedProduct)}`);
                }
              }}
            >
              <div
                className={`search-box ${
                  theme === "dark" ? "dark-sb" : "light-sb"
                }`}
              >
                <input
                  style={
                    theme === "dark" ? { color: "#fff" } : { color: "#000" }
                  }
                  type="text"
                  placeholder={
                    language === "en"
                      ? "Type here..."
                      : language === "ru"
                      ? "Введите сюда..."
                      : "Buraya yazın..."
                  }
                  value={searchedProduct}
                  onChange={(e) => {
                    setSearchedProduct(e.target.value);
                    setShowInputResults(e.target.value.length > 0);
                  }}
                />

                <button
                  type="submit"
                  style={
                    theme === "dark"
                      ? { color: "#fff", backgroundColor: "#2f2f2f" }
                      : { color: "#000", backgroundColor: "#888888" }
                  }
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="17px"
                    height="17px"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M23.784 22.8l-6.168-6.144c1.584-1.848 2.448-4.176 2.448-6.576 0-5.52-4.488-10.032-10.032-10.032-5.52 0-10.008 4.488-10.008 10.008s4.488 10.032 10.032 10.032c2.424 0 4.728-0.864 6.576-2.472l6.168 6.144c0.144 0.144 0.312 0.216 0.48 0.216s0.336-0.072 0.456-0.192c0.144-0.12 0.216-0.288 0.24-0.48 0-0.192-0.072-0.384-0.192-0.504zM18.696 10.080c0 4.752-3.888 8.64-8.664 8.64-4.752 0-8.64-3.888-8.64-8.664 0-4.752 3.888-8.64 8.664-8.64s8.64 3.888 8.64 8.664z"></path>
                  </svg>
                </button>
                {showInputResults && filteredResults.length > 0 && (
                  <div className="search-results">
                    {filteredResults.map((product, index) => (
                      <Link
                        key={index}
                        className="link"
                        to={`/shop/${slugify(product.title)}`}
                        onClick={() => setShowInputResults(false)}
                      >
                        {product.title}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            </form>
          </div>
          <div className="middle-h-center">
            <img src={xstore_logo} alt="XStore Logo" />
          </div>
          <div className="middle-h-right">
            <div>
              {user || JSON.parse(localStorage.getItem("isAdmin")) ? (
                <div onClick={handleLogout} className="link">
                  <FontAwesomeIcon
                    className="header-icon"
                    style={
                      theme === "dark" ? { color: "#fff" } : { color: "#000" }
                    }
                    icon={faSignOut}
                  />
                </div>
              ) : (
                <Link to={"/account/login"} className="link">
                  <FontAwesomeIcon
                    className="header-icon"
                    style={
                      theme === "dark" ? { color: "#fff" } : { color: "#000" }
                    }
                    icon={faUser}
                  />
                </Link>
              )}

              <Link to={"/wishlist"} className="link">
                <FontAwesomeIcon
                  className="header-icon"
                  style={
                    theme === "dark" ? { color: "#fff" } : { color: "#000" }
                  }
                  icon={faHeart}
                />
                <div className="index">{wishlistItemsCount}</div>
              </Link>

              <Link to={"/cart"} className="link">
                <FontAwesomeIcon
                  className="header-icon"
                  style={
                    theme === "dark" ? { color: "#fff" } : { color: "#000" }
                  }
                  icon={faCartShopping}
                />
                <div className="index">{totalUniqueItems}</div>
              </Link>

              {JSON.parse(localStorage.getItem("isAdmin")) ? (
                <Link to={"/admin"} className="link">
                  <FontAwesomeIcon
                    className="header-icon"
                    style={
                      theme === "dark" ? { color: "#fff" } : { color: "#000" }
                    }
                    icon={faUserCog}
                  />
                </Link>
              ) : null}
            </div>
          </div>
        </div>
        <div className="bottom-h">
          <nav>
            <ul>
              <li>
                <NavLink
                  to={"/"}
                  className={({ isActive }) =>
                    isActive ? "navlink navlink-active" : "navlink"
                  }
                  style={
                    theme === "dark" ? { color: "#fff" } : { color: "#000" }
                  }
                >
                  {language === "en"
                    ? "Home"
                    : language === "ru"
                    ? "Главная"
                    : "Ana səhifə"}
                </NavLink>
              </li>
              <li>
                <NavLink
                  to={"/shop"}
                  className={({ isActive }) =>
                    isActive ? "navlink navlink-active" : "navlink"
                  }
                  style={
                    theme === "dark" ? { color: "#fff" } : { color: "#000" }
                  }
                >
                  {language === "en"
                    ? "Shop"
                    : language === "ru"
                    ? "Магазин"
                    : "Mağaza"}
                </NavLink>
              </li>
              <li>
                <NavLink
                  to={"/about"}
                  className={({ isActive }) =>
                    isActive ? "navlink navlink-active" : "navlink"
                  }
                  style={
                    theme === "dark" ? { color: "#fff" } : { color: "#000" }
                  }
                >
                  {language === "en"
                    ? "About Us"
                    : language === "ru"
                    ? "О нас"
                    : "Haqqımızda"}
                </NavLink>
              </li>
              <li>
                <NavLink
                  to={"/contact"}
                  className={({ isActive }) =>
                    isActive ? "navlink navlink-active" : "navlink"
                  }
                  style={
                    theme === "dark" ? { color: "#fff" } : { color: "#000" }
                  }
                >
                  {language === "en"
                    ? "Contact Us"
                    : language === "ru"
                    ? "Контакты"
                    : "Əlaqə"}
                </NavLink>
              </li>
              <li>
                <NavLink
                  to={"/blog"}
                  className={({ isActive }) =>
                    isActive ? "navlink navlink-active" : "navlink"
                  }
                  style={
                    theme === "dark" ? { color: "#fff" } : { color: "#000" }
                  }
                >
                  {language === "en"
                    ? "Blog"
                    : language === "ru"
                    ? "Блог"
                    : "Bloq"}
                </NavLink>
              </li>
              <li>
                <NavLink
                  to={"/faq"}
                  className={({ isActive }) =>
                    isActive ? "navlink navlink-active" : "navlink"
                  }
                  style={
                    theme === "dark" ? { color: "#fff" } : { color: "#000" }
                  }
                >
                  FAQ
                </NavLink>
              </li>
            </ul>
          </nav>
        </div>
      </motion.header>
    </>
  );
};

export default Header;
