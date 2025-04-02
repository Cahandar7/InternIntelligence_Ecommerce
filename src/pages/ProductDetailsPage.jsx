import React, { useState, useContext } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import AnimatedTopHero from "../components/AnimatedTopHero";
import { useCart } from "react-use-cart";
import { useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShirt, faStar } from "@fortawesome/free-solid-svg-icons";
import { Container, Row, Col, Dropdown } from "react-bootstrap";
import size_guide_img from "../assets/images/size_guide.png";
import slugify from "slugify";
import { useWishlist } from "../contexts/WishlistContext";
import { LanguageContext } from "../contexts/LanguageContext";
import { CurrencyContext } from "../contexts/CurrencyContext";

const ProductDetails = () => {
  const [activeColor, setActiveColor] = useState("Choose an option");
  const [activeSize, setActiveSize] = useState("Choose an option");
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const { language } = useContext(LanguageContext);
  const { currency, convertCurrency } = useContext(CurrencyContext);
  const [isZoomed, setIsZoomed] = useState(false);
  const [position, setPosition] = useState({ top: 0, left: 0 });

  const handleMouseEnter = () => {
    setIsZoomed(true);
  };

  const handleMouseLeave = () => {
    setIsZoomed(false);
  };

  const handleMouseMove = (e) => {
    const imageContainer = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - imageContainer.left;
    const y = e.clientY - imageContainer.top;

    setPosition({
      top: (y / imageContainer.height) * 100,
      left: (x / imageContainer.width) * 100,
    });
  };

  const brand_logos = {
    escada:
      "https://xstore.b-cdn.net/demos/dark/wp-content/uploads/sites/5/2016/06/4.png",
    prada:
      "https://xstore.b-cdn.net/demos/dark/wp-content/uploads/sites/5/2016/06/5.png",
    kenzo:
      "https://xstore.b-cdn.net/demos/dark/wp-content/uploads/sites/5/2016/06/3.png",
    amq: "https://xstore.b-cdn.net/demos/dark/wp-content/uploads/sites/5/2016/06/6.png",
    cartier:
      "https://xstore.b-cdn.net/demos/dark/wp-content/uploads/sites/5/2016/06/2.png",
    bulgari:
      "https://xstore.b-cdn.net/demos/dark/wp-content/uploads/sites/5/2016/06/1.png",
  };

  const { addItem } = useCart();
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();

  const products = useSelector((p) => p);
  const { slug } = useParams();

  const selectedProd = products?.find(
    (item) =>
      item.title.toLowerCase().replace(/\s+/g, "-") ===
      slug.toLowerCase().replace(/\s+/g, "-")
  );

  const handleSelectColor = (eventKey) => {
    setActiveColor(eventKey);
  };
  const handleSelectSize = (eventKey) => {
    setActiveSize(eventKey);
  };

  return !selectedProd ? (
    <div className="page">
      <AnimatedTopHero
        page={
          language === "en" ? "Shop" : language === "ru" ? "Магазин" : "Mağaza"
        }
      />
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "column",
          margin: "30px 0",
        }}
      >
        <h1
          style={{
            color: "#ffffff",
            fontSize: "30px",
            textAlign: "center",
            textTransform: "uppercase",
          }}
        >
          {language === "en"
            ? "Product Not Found"
            : language === "ru"
            ? "Продукт не найден"
            : "Məhsul tapılmadı"}
        </h1>
        <span
          className="product-details-btn"
          onClick={() => {
            history.back();
          }}
        >
          {language === "en" ? "Back" : language === "ru" ? "Назад" : "Geri"}
        </span>
      </div>
    </div>
  ) : (
    <div className="page">
      <AnimatedTopHero
        page={
          language === "en" ? "Shop" : language === "ru" ? "Магазин" : "Mağaza"
        }
        second_page={selectedProd.category}
      />
      <Container className="product-details-container">
        <Row>
          <Col
            sm={12}
            md={6}
            lg={5}
            className="image-container"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            onMouseMove={handleMouseMove}
          >
            <img
              src={selectedProd.image}
              alt={selectedProd.title}
              className="product-image"
            />
            {isZoomed && (
              <div
                className="magnified-image"
                style={{
                  backgroundImage: `url(${selectedProd.image})`,
                  backgroundPosition: `${position.left}% ${position.top}%`,
                }}
              ></div>
            )}
          </Col>
          <Col sm={12} md={6} lg={4} className="product-details-texts">
            <p className="product-details-title">{selectedProd.title}</p>
            <p className="product-details-price">
              {convertCurrency(selectedProd.price)}
            </p>
            <div>
              {[...Array(Math.floor(selectedProd.rating / 2))].map(
                (_, index) => (
                  <FontAwesomeIcon
                    key={index}
                    icon={faStar}
                    size="lg"
                    style={{ marginRight: "5px", color: "yellow" }}
                  />
                )
              )}
              {[...Array(5 - Math.floor(selectedProd.rating / 2))].map(
                (_, index) => (
                  <FontAwesomeIcon
                    key={index}
                    icon={faStar}
                    size="lg"
                    style={{ marginRight: "5px" }}
                  />
                )
              )}
            </div>
            <p className="product-details-desc">{selectedProd.description}</p>
            <div
              className="product-details-size"
              onClick={() => {
                isOpen ? setIsOpen(false) : setIsOpen(true);
              }}
            >
              <FontAwesomeIcon
                icon={faShirt}
                size="lg"
                style={{ color: "#888888" }}
              />
              <span style={{ color: "#888888" }}>
                {language === "en"
                  ? "Sizing guide"
                  : language === "ru"
                  ? "Руководство по размеру"
                  : "Ölçü bələdçisi"}
              </span>
              {isOpen ? (
                <>
                  <div
                    style={{
                      position: "fixed",
                      top: "0",
                      left: "0",
                      width: "100%",
                      height: "100%",
                      backgroundColor: "rgba(0, 0, 0, .7)",
                      zIndex: 10,
                    }}
                  ></div>
                  <img
                    src={size_guide_img}
                    alt="size_guide_img"
                    style={{
                      width: "48vw",
                      position: "fixed",
                      top: "70%",
                      left: "50%",
                      transform: "translate(-50%, -50%)",
                      zIndex: 20,
                    }}
                  />
                </>
              ) : null}
            </div>
            <div className="other-info">
              {language === "en"
                ? "Weight"
                : language === "ru"
                ? "Вес"
                : "Çəki"}
              <span>{selectedProd.weight}</span>
            </div>
            <div className="other-info">
              {language === "en"
                ? "Dimensions"
                : language === "ru"
                ? "Размеры"
                : "Ölçülər"}
              <span>{selectedProd.dimensions}</span>
            </div>
            <div className="other-info">
              {language === "en"
                ? "Washcare"
                : language === "ru"
                ? "Стирка"
                : "Yuma təlimatları"}
              <span>{selectedProd.washcare}</span>
            </div>
            <div className="other-info">
              {language === "en"
                ? "Composition"
                : language === "ru"
                ? "Состав"
                : "Tərkibi"}
              <span>{selectedProd.composition}</span>
            </div>

            <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
              <div className="product-details-dropdown">
                <p>
                  {language === "en"
                    ? "Color"
                    : language === "ru"
                    ? "Цвет"
                    : "Rəng"}
                </p>
                <Dropdown onSelect={setActiveColor}>
                  <Dropdown.Toggle variant="dark" id="dropdown-basic">
                    {activeColor}
                  </Dropdown.Toggle>

                  <Dropdown.Menu>
                    <Dropdown.Item
                      eventKey="Red"
                      className={activeColor === "Red" ? "active-item" : ""}
                    >
                      {language === "en"
                        ? "Red"
                        : language === "ru"
                        ? "Красный"
                        : "Qırmızı"}
                    </Dropdown.Item>
                    <Dropdown.Item
                      eventKey="Blue"
                      className={activeColor === "Blue" ? "active-item" : ""}
                    >
                      {language === "en"
                        ? "Blue"
                        : language === "ru"
                        ? "Синий"
                        : "Mavi"}
                    </Dropdown.Item>
                    <Dropdown.Item
                      eventKey="Green"
                      className={activeColor === "Green" ? "active-item" : ""}
                    >
                      {language === "en"
                        ? "Green"
                        : language === "ru"
                        ? "Зеленый"
                        : "Yaşıl"}
                    </Dropdown.Item>
                    <Dropdown.Item
                      eventKey="Black"
                      className={activeColor === "Black" ? "active-item" : ""}
                    >
                      {language === "en"
                        ? "Black"
                        : language === "ru"
                        ? "Черный"
                        : "Qara"}
                    </Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              </div>
              <div className="product-details-dropdown">
                <p>
                  {language === "en"
                    ? "Size"
                    : language === "ru"
                    ? "Размер"
                    : "Ölçü"}
                </p>
                <Dropdown onSelect={setActiveSize}>
                  <Dropdown.Toggle variant="dark" id="dropdown-basic">
                    {activeSize}
                  </Dropdown.Toggle>

                  <Dropdown.Menu>
                    <Dropdown.Item
                      eventKey="S"
                      className={activeSize === "S" ? "active-item" : ""}
                    >
                      S
                    </Dropdown.Item>
                    <Dropdown.Item
                      eventKey="M"
                      className={activeSize === "M" ? "active-item" : ""}
                    >
                      M
                    </Dropdown.Item>
                    <Dropdown.Item
                      eventKey="L"
                      className={activeSize === "L" ? "active-item" : ""}
                    >
                      L
                    </Dropdown.Item>
                    <Dropdown.Item
                      eventKey="XL"
                      className={activeSize === "XL" ? "active-item" : ""}
                    >
                      XL
                    </Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              </div>
            </div>

            <div style={{ display: "flex", alignItems: "center", gap: "15px" }}>
              <span
                className="product-details-btn"
                onClick={() => {
                  addItem(selectedProd);
                  window.location.assign("/cart");
                }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="1em"
                  height="1em"
                  viewBox="0 0 24 24"
                >
                  <path d="M23.76 4.248c-0.096-0.096-0.24-0.24-0.504-0.24h-18.48l-0.48-2.4c-0.024-0.288-0.384-0.528-0.624-0.528h-2.952c-0.384 0-0.624 0.264-0.624 0.624s0.264 0.648 0.624 0.648h2.424l2.328 11.832c0.312 1.608 1.848 2.856 3.48 2.856h11.28c0.384 0 0.624-0.264 0.624-0.624s-0.264-0.624-0.624-0.624h-11.16c-0.696 0-1.344-0.312-1.704-0.816l14.064-1.92c0.264 0 0.528-0.24 0.528-0.528l1.968-7.824v-0.024c-0.024-0.048-0.024-0.288-0.168-0.432zM22.392 5.184l-1.608 6.696-14.064 1.824-1.704-8.52h17.376zM8.568 17.736c-1.464 0-2.592 1.128-2.592 2.592s1.128 2.592 2.592 2.592c1.464 0 2.592-1.128 2.592-2.592s-1.128-2.592-2.592-2.592zM9.888 20.328c0 0.696-0.624 1.32-1.32 1.32s-1.32-0.624-1.32-1.32 0.624-1.32 1.32-1.32 1.32 0.624 1.32 1.32zM18.36 17.736c-1.464 0-2.592 1.128-2.592 2.592s1.128 2.592 2.592 2.592c1.464 0 2.592-1.128 2.592-2.592s-1.128-2.592-2.592-2.592zM19.704 20.328c0 0.696-0.624 1.32-1.32 1.32s-1.344-0.6-1.344-1.32 0.624-1.32 1.32-1.32 1.344 0.624 1.344 1.32z"></path>
                </svg>
                {language === "en"
                  ? "Add to Cart"
                  : language === "ru"
                  ? "В корзину"
                  : "Səbətə at"}
              </span>
              <span
                className="product-details-btn"
                onClick={() => {
                  if (isInWishlist(selectedProd)) {
                    removeFromWishlist(selectedProd);
                  } else {
                    addToWishlist(selectedProd);
                  }
                }}
              >
                <svg
                  width="1em"
                  height="1em"
                  xmlns="http://www.w3.org/2000/svg"
                  xmlns:xlink="http://www.w3.org/1999/xlink"
                  x="0px"
                  y="0px"
                  viewBox="0 0 100 100"
                  xml:space="preserve"
                >
                  <path
                    d="M99.5,31.5C98.4,17.2,86.3,5.7,71.9,5.3C63.8,5,55.6,8.5,50,14.5C44.3,8.4,36.4,5,28.1,5.3C13.7,5.7,1.6,17.2,0.5,31.5
        c-0.1,1.2-0.1,2.5-0.1,3.7c0.2,5.1,2.4,10.2,6.1,14.3l39.2,43.4c1.1,1.2,2.7,1.9,4.3,1.9c1.6,0,3.2-0.7,4.4-1.9l39.1-43.4
        c3.7-4.1,5.8-9.1,6.1-14.3C99.6,34,99.6,32.7,99.5,31.5z M49.6,89.2L10.5,45.8c-2.8-3.2-4.2-7.2-4.4-11.4c-0.1-2.2,0.4-4.4,1.4-6.3
        c1.1-1.9,2.7-3.4,4.7-4.2c2.3-0.9,4.7-1.2,7.2-1.1c5.2,0.1,9.8,2.4,13.1,6.2c1.3,1.4,2.5,3,3.4,4.7c0.9-1.7,2.1-3.3,3.4-4.7
        c3.3-3.8,7.8-6.1,13-6.2c2.4-0.1,4.8,0.2,7.1,1.1c2.1,0.8,3.7,2.3,4.8,4.2c1,1.9,1.5,4.1,1.4,6.3c-0.2,4.2-1.6,8.3-4.4,11.4
        L49.6,89.2z"
                  />
                </svg>
                {language === "en"
                  ? "Add to Wishlist"
                  : language === "ru"
                  ? "В избранное"
                  : "Bəyənilənlərə at"}
              </span>
              <span
                className="product-details-btn"
                onClick={() => {
                  history.back();
                }}
              >
                {language === "en"
                  ? "Back"
                  : language === "ru"
                  ? "Назад"
                  : "Geri"}
              </span>
            </div>
          </Col>
          <Col sm={12} md={12} lg={3} className="products-details-other">
            <div className="other1">
              <h1>{selectedProd.brand}</h1>
              <img
                src={brand_logos[selectedProd.brand.toLowerCase()]}
                alt={selectedProd.brand}
              />
              <Link to={"/shop"} className="link">
                {language === "en"
                  ? "View all products"
                  : language === "ru"
                  ? "Посмотреть все товары"
                  : "Bütün məhsulları gör"}
              </Link>
            </div>
            <div className="you-also-like">
              {language === "en"
                ? "You may also like..."
                : language === "ru"
                ? "Вам также может понравиться..."
                : "Sizə də bəyənə bilərsiniz..."}
            </div>
            <Row>
              {products
                .filter(
                  (item, index) =>
                    item.category.toLowerCase() ===
                      selectedProd.category.toLowerCase() &&
                    item.title !== selectedProd.title
                )
                .map((newItem, newIndex) => (
                  <Col
                    key={newIndex}
                    sm={6}
                    md={6}
                    lg={12}
                    style={{
                      width: "100%",
                      display: "flex",
                      justifyContent: "space-between",
                    }}
                    onClick={() => {
                      navigate(`/shop/${slugify(newItem.title)}`);
                    }}
                  >
                    <img
                      src={newItem.image}
                      alt={newItem.title}
                      style={{ width: "50%", height: "80%" }}
                    />
                    <div
                      style={{
                        width: "45%",
                        display: "flex",
                        flexDirection: "column",
                      }}
                    >
                      <h1 className="its-title">{newItem.title}</h1>
                      <p className="its-title">
                        {convertCurrency(newItem.price)}
                      </p>
                    </div>
                  </Col>
                ))}
            </Row>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default ProductDetails;
