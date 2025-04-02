import React, { useState, useContext } from "react";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import { Table, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import {
  add_product,
  edit_product,
  delete_product,
} from "../redux_tools/actions/productActions";
import { LanguageContext } from "../contexts/LanguageContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen, faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";

const AdminPanel = () => {
  const products = useSelector((p) => p);
  const dispatch = useDispatch();
  const { language, setLanguage } = useContext(LanguageContext);
  const navigate = useNavigate();
  const [show, setShow] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [selectedProductId, setSelectedProductId] = useState(null);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    image: "",
    price: "",
    sku: "",
    category: "",
    brand: "",
    rating: "",
    gender: "",
    weight: "",
    dimensions: "",
    washcare: "",
    composition: "",
    stockStatus: false,
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleClose = () => {
    setShow(false);
    setEditMode(false);
    setSelectedProductId(null);
    setFormData({
      title: "",
      description: "",
      image: "",
      price: "",
      sku: "",
      category: "",
      brand: "",
      rating: "",
      gender: "",
      weight: "",
      dimensions: "",
      washcare: "",
      composition: "",
      stockStatus: false,
    });
  };
  const languageNames = {
    en: "English",
    ru: "Русский",
    az: "Azərbaycan",
  };

  const handleAddProduct = () => {
    const newProduct = {
      ...formData,
      id: products.length > 0 ? products.length : 1,
    };
    dispatch(add_product(newProduct));
    handleClose();
  };

  const handleEditProduct = () => {
    dispatch(edit_product(selectedProductId, formData));
    handleClose();
  };

  const openEditModal = (product) => {
    setEditMode(true);
    setSelectedProductId(product.id);
    setFormData(product);
    setShow(true);
  };

  if (!products || products.length === 0) {
    return (
      <h1 style={{ color: "#fff", margin: "30px" }}>No products available</h1>
    );
  }

  return (
    <div className="admin-panel">
      <header className="admin-panel-header">
        <div className="dropdown">
          <button
            className="dropdown-toggle"
            type="button"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          >
            {languageNames[language] || ""}
          </button>
          <ul className="dropdown-menu">
            <li>
              <button
                className="dropdown-item"
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
        <div style={{ display: "flex", alignItems: "center", gap: "20px" }}>
          <span
            className="admin-add-prod-btn"
            onClick={() => {
              setShow(true);
            }}
          >
            {language === "en"
              ? "Add product"
              : language === "ru"
              ? "Добавить товар"
              : "Məhsul əlavə et"}
          </span>
          <span
            className="admin-add-prod-btn"
            onClick={() => {
              navigate("/");
            }}
          >
            {language === "en"
              ? "Back Home"
              : language === "ru"
              ? "Назад на главную"
              : "Geri Qayıt"}
          </span>
        </div>
      </header>

      <div className="admin-table-container">
        <Table responsive bordered hover variant="dark" className="admin-table">
          <thead>
            <tr>
              <th className="id-column">#</th>
              <th className="title-column">
                {language === "en"
                  ? "TITLE"
                  : language === "ru"
                  ? "НАЗВАНИЕ"
                  : "BAŞLIQ"}
              </th>
              <th className="description-column">
                {language === "en"
                  ? "DESCRIPTION"
                  : language === "ru"
                  ? "ОПИСАНИЕ"
                  : "TƏSVİR"}
              </th>
              <th className="image-column">
                {language === "en"
                  ? "IMAGE"
                  : language === "ru"
                  ? "ИЗОБРАЖЕНИЕ"
                  : "ŞƏKİL"}
              </th>
              <th className="price-column">
                {language === "en"
                  ? "PRICE"
                  : language === "ru"
                  ? "ЦЕНА"
                  : "QİYMƏT"}
              </th>
              <th className="sku-column">
                {language === "en"
                  ? "SKU"
                  : language === "ru"
                  ? "АРТИКУЛ"
                  : "SKU"}
              </th>
              <th className="category-column">
                {language === "en"
                  ? "CATEGORY"
                  : language === "ru"
                  ? "КАТЕГОРИЯ"
                  : "KATEQORİYA"}
              </th>
              <th className="brand-column">
                {language === "en"
                  ? "BRAND"
                  : language === "ru"
                  ? "БРЕНД"
                  : "BREND"}
              </th>
              <th className="rating-column">
                {language === "en"
                  ? "RATING"
                  : language === "ru"
                  ? "РЕЙТИНГ"
                  : "REYTİNG"}
              </th>
              <th className="gender-column">
                {language === "en"
                  ? "GENDER"
                  : language === "ru"
                  ? "ПОЛ"
                  : "CİNS"}
              </th>
              <th className="weight-column">
                {language === "en"
                  ? "WEIGHT"
                  : language === "ru"
                  ? "ВЕС"
                  : "ÇƏKİ"}
              </th>
              <th className="dimensions-column">
                {language === "en"
                  ? "DIMENSIONS"
                  : language === "ru"
                  ? "РАЗМЕРЫ"
                  : "ÖLÇÜLƏR"}
              </th>
              <th className="washcare-column">
                {language === "en"
                  ? "WASHCARE"
                  : language === "ru"
                  ? "УХОД ЗА ТКАНЯМИ"
                  : "TƏMİZLƏMƏ"}
              </th>
              <th className="composition-column">
                {language === "en"
                  ? "COMPOSITION"
                  : language === "ru"
                  ? "СОСТАВ"
                  : "TƏRKİBİ"}
              </th>
              <th className="stockstatus-column">
                {language === "en"
                  ? "STOCKSTATUS"
                  : language === "ru"
                  ? "СТАТУС НАЛИЧИЯ"
                  : "ANBAR VƏZİYYƏTİ"}
              </th>
              <th className="actions-column">
                {language === "en"
                  ? "Actions"
                  : language === "ru"
                  ? "ДЕЙСТВИЯ"
                  : "ƏMƏLİYYATLAR"}
              </th>
            </tr>
          </thead>
          <tbody>
            {products.map((product, index) => (
              <tr key={index}>
                <td className="id-column">{product.id + 1}</td>
                <td className="title-column">{product.title}</td>
                <td className="description-column" title={product.description}>
                  {product.description}
                </td>
                <td className="image-column">{product.image} </td>
                <td className="price-column">
                  ${Number(product.price).toFixed(2)}
                </td>
                <td className="sku-column">0{product.sku}</td>
                <td className="category-column">{product.category}</td>
                <td className="brand-column">{product.brand}</td>
                <td className="rating-column">{product.rating}</td>
                <td className="gender-column">{product.gender}</td>
                <td className="weight-column">{product.weight}</td>
                <td className="dimensions-column">{product.dimensions}</td>
                <td className="washcare-column">{product.washcare}</td>
                <td className="composition-column">{product.composition}</td>
                <td className="stockstatus-column">
                  {product.stockStatus
                    ? language === "en"
                      ? "In stock"
                      : language === "ru"
                      ? "В наличии"
                      : "Əldə mövcuddur"
                    : language === "en"
                    ? "Not in stock"
                    : language === "ru"
                    ? "Нет в наличии"
                    : "Əldə mövcud deyil"}
                </td>
                <td className="actions-column">
                  <Button
                    variant="warning"
                    size="sm"
                    className="me-2 edit-btn"
                    onClick={() => {
                      openEditModal(product);
                    }}
                  >
                    <FontAwesomeIcon icon={faPen} />
                  </Button>

                  <Button
                    variant="danger"
                    size="sm"
                    className="delete-btn"
                    onClick={() => {
                      delete_product(product.id);
                    }}
                  >
                    <FontAwesomeIcon icon={faTrashAlt} />
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header>
          <Modal.Title>
            {editMode
              ? language === "en"
                ? "Edit Product"
                : language === "ru"
                ? "Редактировать товар"
                : "Məhsulu Düzəlt"
              : language === "en"
              ? "Add Product"
              : language === "ru"
              ? "Добавить товар"
              : "Məhsul Əlavə Et"}
          </Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <Form>
            {Object.keys(products[0]).map((prodKey, index) => {
              if (prodKey === "id") return null;
              return (
                <Form.Group key={index} className="mb-3">
                  <Form.Control
                    name={prodKey}
                    type="text"
                    placeholder={prodKey}
                    value={formData[prodKey] || ""}
                    onChange={handleInputChange}
                    autoFocus={index === 0}
                  />
                </Form.Group>
              );
            })}
          </Form>
        </Modal.Body>

        <Modal.Footer>
          <Button variant="dark" onClick={handleClose}>
            {language === "en"
              ? "Close"
              : language === "ru"
              ? "Закрыть"
              : "Bağla"}
          </Button>
          <Button
            variant="dark"
            onClick={editMode ? handleEditProduct : handleAddProduct}
          >
            {editMode
              ? language === "en"
                ? "Save Changes"
                : language === "ru"
                ? "Сохранить изменения"
                : "Yadda Saxla"
              : language === "en"
              ? "Add"
              : language === "ru"
              ? "Добавить"
              : "Əlavə Et"}
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default AdminPanel;
