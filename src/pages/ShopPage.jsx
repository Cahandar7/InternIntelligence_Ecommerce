import React, { useEffect, useState, useContext } from "react";
import {
  Accordion,
  Col,
  Container,
  Dropdown,
  Form,
  Row,
} from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGlobe, faStar, faTruck } from "@fortawesome/free-solid-svg-icons";
import ProductCard from "../components/ProductCard";
import AnimatedTopHero from "../components/AnimatedTopHero";
import { useSelector } from "react-redux";
import { LanguageContext } from "../contexts/LanguageContext";
import { CurrencyContext } from "../contexts/CurrencyContext";
import product_not_found from "../assets/images/product_not_found.gif";

const ShopPage = () => {
  const products = useSelector((p) => p);
  const { language } = useContext(LanguageContext);
  const { convertCurrency } = useContext(CurrencyContext);
  const [activeItem, setActiveItem] = useState(
    language === "en"
      ? "Default Sorting"
      : language === "ru"
      ? "Сортировка по умолчанию"
      : "Defolt sıralama"
  );
  const [activeBox, setActiveBox] = useState("square1");
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState(new Set());
  const [selectedBrands, setSelectedBrands] = useState(new Set());
  const [selectedGender, setSelectedGender] = useState(null);
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(1000);
  const [star, setStar] = useState(false);

  const minLimit = 0;
  const maxLimit = 1000;

  useEffect(() => {
    let filtered = [...products];

    if (selectedCategories.size > 0) {
      filtered = filtered.filter((item) =>
        selectedCategories.has(item.category)
      );
    }

    if (selectedBrands.size > 0) {
      filtered = filtered.filter((item) => selectedBrands.has(item.brand));
    }

    if (selectedGender) {
      filtered = filtered.filter((item) => item.gender === selectedGender);
    }

    filtered = filtered.filter(
      (item) => item.price >= minPrice && item.price <= maxPrice
    );

    if (star > 0) {
      filtered = filtered.filter((item) => item.rating >= star * 2);
    }

    if (activeItem === "Sort by rating") {
      filtered.sort((a, b) => b.rating - a.rating);
    } else if (activeItem === "Sort by latest") {
      filtered.sort((a, b) => new Date(b.date) - new Date(a.date));
    } else if (activeItem === "Sort by price: low to high") {
      filtered.sort((a, b) => a.price - b.price);
    } else if (activeItem === "Sort by price: high to low") {
      filtered.sort((a, b) => b.price - a.price);
    }

    setFilteredProducts(filtered);
  }, [
    activeItem,
    products,
    selectedGender,
    selectedCategories,
    selectedBrands,
    minPrice,
    maxPrice,
    star,
  ]);

  const handleCategoryChange = (category) => {
    setSelectedCategories((prev) => {
      const newCategories = new Set(prev);
      newCategories.has(category)
        ? newCategories.delete(category)
        : newCategories.add(category);
      return newCategories;
    });
  };

  const handleBrandChange = (brand) => {
    setSelectedBrands((prev) => {
      const newBrands = new Set(prev);
      newBrands.has(brand) ? newBrands.delete(brand) : newBrands.add(brand);
      return newBrands;
    });
  };

  const handleGenderChange = (gender) => {
    setSelectedGender(gender);
  };

  const clearFilters = () => {
    setSelectedGender(null);
    setSelectedCategories(new Set());
    setSelectedBrands(new Set());
    setMinPrice(0);
    setMaxPrice(1000);
    setStar(0);
  };

  const handleSelect = (eventKey) => {
    setActiveItem(eventKey);
  };

  return (
    <div className="shop-page page">
      <AnimatedTopHero
        page={
          language === "en" ? "Shop" : language === "ru" ? "Магазин" : "Mağaza"
        }
      />
      <Container className="products-con">
        <Row>
          <Col sm={12} md={3} lg={3}>
            <Accordion className="acc1">
              <Accordion.Item className="acc1-item">
                <Accordion.Header className="acc1-header">
                  {language === "en"
                    ? "Filter by Category"
                    : language === "ru"
                    ? "Фильтр по категории"
                    : "Kateqoriya üzrə Filtrlə"}
                </Accordion.Header>
                <Accordion.Body className="acc1-body">
                  <Accordion className="acc2">
                    <Accordion.Item eventKey="1" className="acc2-item">
                      <Accordion.Header className="acc2-header">
                        {language === "en"
                          ? "Gender"
                          : language === "ru"
                          ? "Пол"
                          : "Cins"}
                      </Accordion.Header>
                      <Accordion.Body className="acc2-body">
                        {[...new Set(products.map((item) => item.gender))].map(
                          (gender, index) => (
                            <div key={index}>
                              <input
                                type="checkbox"
                                checked={selectedGender === gender}
                                onChange={() => handleGenderChange(gender)}
                              />
                              <span>{gender}</span>
                            </div>
                          )
                        )}
                      </Accordion.Body>
                    </Accordion.Item>
                  </Accordion>

                  <Accordion className="acc2">
                    <Accordion.Item eventKey="2" className="acc2-item">
                      <Accordion.Header className="acc2-header">
                        {language === "en"
                          ? "Brand"
                          : language === "ru"
                          ? "Бренд"
                          : "Brend"}
                      </Accordion.Header>
                      <Accordion.Body className="acc2-body">
                        {[...new Set(products.map((item) => item.brand))].map(
                          (brand, index) => (
                            <div key={index}>
                              <input
                                type="checkbox"
                                checked={selectedBrands.has(brand)}
                                onChange={() => handleBrandChange(brand)}
                              />
                              <span>{brand}</span>
                            </div>
                          )
                        )}
                      </Accordion.Body>
                    </Accordion.Item>
                  </Accordion>

                  <Accordion className="acc2">
                    <Accordion.Item eventKey="3" className="acc2-item">
                      <Accordion.Header className="acc2-header">
                        {language === "en"
                          ? "Category"
                          : language === "ru"
                          ? "Категория"
                          : "Kateqoriya"}
                      </Accordion.Header>
                      <Accordion.Body className="acc2-body">
                        {[
                          ...new Set(products.map((item) => item.category)),
                        ].map((category, index) => (
                          <div key={index}>
                            <input
                              type="checkbox"
                              checked={selectedCategories.has(category)}
                              onChange={() => handleCategoryChange(category)}
                            />
                            <span>{category}</span>
                          </div>
                        ))}
                      </Accordion.Body>
                    </Accordion.Item>
                  </Accordion>
                </Accordion.Body>
              </Accordion.Item>
            </Accordion>

            <Accordion className="acc1">
              <Accordion.Item className="acc1-item">
                <Accordion.Header className="acc1-header">
                  {language === "en"
                    ? "Filter By Price"
                    : language === "ru"
                    ? "Фильтровать по цене"
                    : "Qiymətə görə Filtrlə"}
                </Accordion.Header>
                <Accordion.Body className="acc1-body">
                  <Form>
                    <Form.Label>
                      {language === "en" ? (
                        <span>
                          Price: {convertCurrency(0)} - {convertCurrency(1000)}
                        </span>
                      ) : language === "ru" ? (
                        <span>
                          Цена: {convertCurrency(0)} - {convertCurrency(1000)}
                        </span>
                      ) : (
                        <span>
                          Qiymət: {convertCurrency(0)} - {convertCurrency(1000)}
                        </span>
                      )}
                    </Form.Label>

                    <div className="range-slider">
                      <input
                        type="range"
                        min={minLimit}
                        max={maxLimit}
                        value={minPrice}
                        onChange={(e) =>
                          setMinPrice(
                            Math.min(Number(e.target.value), maxPrice - 10)
                          )
                        }
                        className="range-slider-input left-thumb"
                      />
                      <input
                        type="range"
                        min={minLimit}
                        max={maxLimit}
                        value={maxPrice}
                        onChange={(e) =>
                          setMaxPrice(
                            Math.max(Number(e.target.value), minPrice + 10)
                          )
                        }
                        className="range-slider-input right-thumb"
                      />
                    </div>

                    <div className="range-inputs">
                      <Form.Control
                        type="number"
                        value={minPrice}
                        min={minLimit}
                        max={maxPrice - 10}
                        onChange={(e) =>
                          setMinPrice(
                            Math.min(Number(e.target.value), maxPrice - 10)
                          )
                        }
                      />
                      <Form.Control
                        type="number"
                        value={maxPrice}
                        min={minPrice + 10}
                        max={maxLimit}
                        onChange={(e) =>
                          setMaxPrice(
                            Math.max(Number(e.target.value), minPrice + 10)
                          )
                        }
                      />
                    </div>
                  </Form>
                </Accordion.Body>
              </Accordion.Item>
            </Accordion>

            <Accordion defaultActiveKey="0" className="acc1">
              <Accordion.Item eventKey="0" className="acc1-item">
                <Accordion.Header className="acc1-header">
                  {language === "en"
                    ? "Filter By Rating"
                    : language === "ru"
                    ? "Фильтровать по рейтингу"
                    : "Reytinqə görə Filtrlə"}
                </Accordion.Header>

                <Accordion.Body className="acc1-body">
                  {Array.from({ length: 5 }).map((_, index) => (
                    <FontAwesomeIcon
                      key={index}
                      icon={faStar}
                      size="lg"
                      onClick={() =>
                        star === index + 1 ? setStar(0) : setStar(index + 1)
                      }
                      className={index < star ? "yellow-star" : ""}
                      style={{
                        cursor: "pointer",
                        marginRight: "7px",
                        transition: ".2s",
                      }}
                    />
                  ))}
                </Accordion.Body>
              </Accordion.Item>
            </Accordion>

            <div className="clear-filters-btn">
              <button
                onClick={() => {
                  clearFilters();
                }}
              >
                {language === "en"
                  ? "Clear Filters"
                  : language === "ru"
                  ? "Сбросить фильтры"
                  : "Filtrləri Təmizlə"}
              </button>
            </div>
            <div className="shop-box">
              <FontAwesomeIcon
                icon={faGlobe}
                size="2x"
                className="shop-box-icon"
              />
              <h1>
                {language === "en"
                  ? "WORLDWIDE DELIVERY"
                  : language === "ru"
                  ? "Международная доставка"
                  : "DÜNYA ÜZRƏ ÇATDIRILMA"}
              </h1>
              <p>
                {language === "en"
                  ? "We deliver to over 100 countries around the world, ensuring that your orders arrive safely and quickly."
                  : language === "ru"
                  ? "Мы доставляем в более чем 100 стран мира, гарантируя, что ваши заказы будут доставлены быстро и безопасно."
                  : "Biz 100-dən çox ölkəyə çatdırılma həyata keçiririk, sifarişlərinizin təhlükəsiz və sürətli çatdırılmasını təmin edirik."}
              </p>
            </div>

            <div className="shop-box">
              <FontAwesomeIcon
                icon={faTruck}
                size="2x"
                className="shop-box-icon"
              />
              <h1>
                {language === "en"
                  ? "FREE SHIPPING"
                  : language === "ru"
                  ? "БЕСПЛАТНАЯ ДОСТАВКА"
                  : "PULSUZ ÇATDIRILMA"}
              </h1>
              <p>
                {language === "en"
                  ? "Enjoy free shipping on all orders. Our service ensures that every order is delivered with the care and efficiency."
                  : language === "ru"
                  ? "Наслаждайтесь бесплатной доставкой на все заказы. Наша служба доставки гарантирует, что каждый заказ будет доставлен с заботой и эффективностью."
                  : "Bütün sifarişlərə pulsuz çatdırılma imkanı. Xidmətimiz hər bir sifarişin diqqət və səmərəliliklə çatdırılmasını təmin edir."}
              </p>
            </div>
          </Col>
          <Col sm={12} md={9} lg={9}>
            <div
              style={{
                width: "30%",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <Dropdown onSelect={handleSelect}>
                <Dropdown.Toggle variant="dark" id="dropdown-basic">
                  {language === "en"
                    ? activeItem
                    : language === "ru"
                    ? activeItem === "Sort by latest"
                      ? "Сортировать по новым"
                      : activeItem === "Sort by rating"
                      ? "Сортировать по рейтингу"
                      : activeItem === "Sort by price: low to high"
                      ? "Сортировать по цене: от низкой к высокой"
                      : activeItem === "Sort by price: high to low"
                      ? "Сортировать по цене: от высокой к низкой"
                      : activeItem
                    : language === "az"
                    ? activeItem === "Sort by latest"
                      ? "Ən son sıralama"
                      : activeItem === "Sort by rating"
                      ? "Reytinqə görə sıralama"
                      : activeItem === "Sort by price: low to high"
                      ? "Qiymətə görə: aşağıdan yuxarıya"
                      : activeItem === "Sort by price: high to low"
                      ? "Qiymətə görə: yuxarıdan aşağıya"
                      : activeItem
                    : activeItem}
                </Dropdown.Toggle>

                <Dropdown.Menu>
                  <Dropdown.Item
                    eventKey="Sort by latest"
                    className={
                      activeItem === "Sort by latest" ? "active-item" : ""
                    }
                  >
                    {language === "en"
                      ? "Sort by latest"
                      : language === "ru"
                      ? "Сортировать по новизне"
                      : "Ən son sıralama"}
                  </Dropdown.Item>
                  <Dropdown.Item
                    eventKey="Sort by rating"
                    className={
                      activeItem === "Sort by rating" ? "active-item" : ""
                    }
                  >
                    {language === "en"
                      ? "Sort by rating"
                      : language === "ru"
                      ? "Сортировать по рейтингу"
                      : "Reytinqə görə sıralama"}
                  </Dropdown.Item>
                  <Dropdown.Item
                    eventKey="Sort by price: low to high"
                    className={
                      activeItem === "Sort by price: low to high"
                        ? "active-item"
                        : ""
                    }
                  >
                    {language === "en"
                      ? "Sort by price: low to high"
                      : language === "ru"
                      ? "Сортировать по цене: от низкой к высокой"
                      : "Qiymətə görə: aşağıdan yuxarıya"}
                  </Dropdown.Item>
                  <Dropdown.Item
                    eventKey="Sort by price: high to low"
                    className={
                      activeItem === "Sort by price: high to low"
                        ? "active-item"
                        : ""
                    }
                  >
                    {language === "en"
                      ? "Sort by price: high to low"
                      : language === "ru"
                      ? "Сортировать по цене: от высокой к низкой"
                      : "Qiymətə görə: yuxarıdan aşağıya"}
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
              <div className="sort-box">
                <div
                  className={`sort-box-square1 ${
                    activeBox === "square1" ? "active-square-box" : ""
                  }`}
                  onClick={() => {
                    setActiveBox("square1");
                  }}
                >
                  {Array.from({ length: 9 }).map((_, index) => (
                    <div key={index} className="sort-box-circle"></div>
                  ))}
                </div>
                <div
                  style={{
                    width: "1px",
                    height: "22px",
                    backgroundColor: "#888888",
                    opacity: ".3",
                  }}
                ></div>
                <div
                  className={`sort-box-square2 ${
                    activeBox === "square2" ? "active-square-box" : ""
                  }`}
                  onClick={() => {
                    setActiveBox("square2");
                  }}
                >
                  {[...Array(3)].map((_, index) => (
                    <React.Fragment key={index}>
                      <div className="sort-box-circle"></div>
                      <div className="sort-box-line"></div>
                    </React.Fragment>
                  ))}
                </div>
              </div>
            </div>

            <Row className="mt-3">
              {filteredProducts.length === 0 ? (
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "flex-end",
                    flexDirection: "column",
                    border: "1px solid #333",
                  }}
                >
                  <img src={product_not_found} width="300" height="300" />
                  <h1
                    style={{
                      color: "#ffffff",
                      fontSize: "30px",
                      textAlign: "center",
                      textTransform: "uppercase",
                    }}
                  >
                    {language === "en"
                      ? "Products Not Found"
                      : language === "ru"
                      ? "Продукты не найдены"
                      : "Məhsullar Tapılmadı"}
                  </h1>
                </div>
              ) : (
                filteredProducts.map((item, index) => (
                  <Col
                    sm={activeBox === "square1" ? 12 : 12}
                    md={activeBox === "square1" ? 4 : 12}
                    lg={activeBox === "square1" ? 4 : 12}
                    className="mb-4"
                    key={index}
                  >
                    <ProductCard
                      show={activeBox}
                      image={item.image}
                      title={item.title}
                      description={item.description}
                      category={item.category}
                      brand={item.brand}
                      price={item.price}
                      alldata={item}
                    />
                  </Col>
                ))
              )}
            </Row>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default ShopPage;
