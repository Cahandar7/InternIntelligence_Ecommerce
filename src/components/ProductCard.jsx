import React, { useState, useContext } from "react";
import Card from "react-bootstrap/Card";
import { faEye, faHeart } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import { useCart } from "react-use-cart";
import { useWishlist } from "../contexts/WishlistContext";
import slugify from "slugify";
import { LanguageContext } from "../contexts/LanguageContext";

const ProductCard = ({
  show,
  image,
  title,
  description,
  category,
  brand,
  price,
  alldata,
}) => {
  const { addItem } = useCart();
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();
  const [isHovered, setIsHovered] = useState(false);
  const { language } = useContext(LanguageContext);

  return (
    <Card
      className={`prod-card-con ${
        show === "square2" ? "prod-card-con-detailed" : ""
      }`}
      onMouseEnter={() => {
        setIsHovered(true);
      }}
      onMouseLeave={() => {
        setIsHovered(false);
      }}
    >
      <span className="prod-card-icons">
        <Link to={`/shop/${slugify(title)}`}>
          <FontAwesomeIcon className="prod-card-icon" icon={faEye} size="lg" />
        </Link>
        <FontAwesomeIcon
          onClick={() => {
            if (isInWishlist(alldata)) {
              removeFromWishlist(alldata);
            } else {
              addToWishlist(alldata);
            }
          }}
          className="prod-card-icon"
          style={{ color: isInWishlist(alldata) ? "red" : "#ffffff" }}
          icon={faHeart}
          size="lg"
        />
      </span>
      <Card.Img
        variant="top"
        src={image}
        alt={title}
        className="prod-card-img"
      />
      <Card.Body className="prod-card-texts">
        <Card.Text className="prod-card-supertitle">
          <span>{category}</span>
          <span>{show === "square1" ? brand : ""}</span>
        </Card.Text>
        <Card.Title className="prod-card-title">{title}</Card.Title>
        {show === "square2" && (
          <Card.Text className="prod-card-supertitle">{brand}</Card.Text>
        )}
        {show === "square2" && (
          <Card.Text className="prod-card-supertitle">{description}</Card.Text>
        )}

        <Card.Text className="prod-card-subtitle ">
          {isHovered ? (
            <span
              className="add-to-cart-text"
              onClick={() => {
                addItem(alldata);
                window.location.assign("/cart");
              }}
            >
              {language === "en"
                ? "Add to Cart"
                : language === "ru"
                ? "Добавить в корзину"
                : "Səbətə əlavə et"}
            </span>
          ) : (
            <span className="prod-card-price">${price}</span>
          )}
        </Card.Text>
      </Card.Body>
    </Card>
  );
};

export default ProductCard;
