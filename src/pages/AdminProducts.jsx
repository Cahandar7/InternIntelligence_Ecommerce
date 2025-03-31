import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import { Table, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import {
  add_product,
  edit_product,
  delete_product,
} from "../redux_tools/actions/productActions";

const AdminProducts = () => {
  const products = useSelector((p) => p);
  const dispatch = useDispatch();
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
    <div className="admin-products-container">
      <button
        className="btn btn-primary"
        onClick={() => {
          setShow(true);
        }}
      >
        Add Product
      </button>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header>
          <Modal.Title>{editMode ? "Edit Product" : "Add Product"}</Modal.Title>
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
            Close
          </Button>
          <Button
            variant="dark"
            onClick={editMode ? handleEditProduct : handleAddProduct}
          >
            {editMode ? "Save Changes" : "Add"}
          </Button>
        </Modal.Footer>
      </Modal>
      <Table responsive bordered hover variant="dark" className="admin-table">
        <thead>
          <tr>
            <th className="id-column">#</th>
            <th className="title-column">TITLE</th>
            <th className="description-column">DESCRIPTION</th>
            <th className="image-column">IMAGE</th>
            <th className="price-column">PRICE</th>
            <th className="sku-column">SKU</th>
            <th className="category-column">CATEGORY</th>
            <th className="brand-column">BRAND</th>
            <th className="rating-column">RATING</th>
            <th className="gender-column">GENDER</th>
            <th className="weight-column">WEIGHT</th>
            <th className="dimensions-column">DIMENSIONS</th>
            <th className="washcare-column">WASHCARE</th>
            <th className="composition-column">COMPOSITION</th>
            <th className="stockstatus-column">STOCKSTATUS</th>
            <th className="actions-column">Actions</th>
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
                {product.stockStatus ? "In stock" : "Not in stock"}
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
                  Edit
                </Button>
                <Button
                  variant="danger"
                  size="sm"
                  className="delete-btn"
                  onClick={() => {
                    delete_product(product.id);
                  }}
                >
                  Delete
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default AdminProducts;
