import React, { useState, useEffect, useRef } from "react";
import ProductCard from "./ProductCard";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronLeft,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";

const HomeProductsCarousel = () => {


  const [startIndex, setStartIndex] = useState(0);
  const intervalRef = useRef(null);

  const totalSlides = cards.length - 2; // because 3 cards are shown at once

  const showNext = () => {
    setStartIndex((prev) => (prev + 1) % totalSlides);
    resetAutoSlide();
  };

  const showPrev = () => {
    setStartIndex((prev) => (prev - 1 + totalSlides) % totalSlides);
    resetAutoSlide();
  };

  const jumpToSlide = (index) => {
    setStartIndex(index);
    resetAutoSlide();
  };

  const startAutoSlide = () => {
    intervalRef.current = setInterval(() => {
      setStartIndex((prev) => (prev + 1) % totalSlides);
    }, 2500);
  };

  const resetAutoSlide = () => {
    clearInterval(intervalRef.current);
    startAutoSlide();
  };

  useEffect(() => {
    startAutoSlide();
    return () => clearInterval(intervalRef.current);
  }, []);

  return (
    <div className="home-card-carousel">
      <div className="home-card-carousel-title">
        <h1>Uğur</h1>
        <span>Hekayələrimiz</span>
      </div>

      <div className="slider-wrapper">
        <button onClick={showPrev} className="nav-button">
          <svg
            width="23"
            height="50"
            viewBox="0 0 23 50"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M5.42295 24.5387C4.96554 25.0724 4.96554 25.8598 5.42295 26.3935L22.3032 46.0871C23.1569 47.083 23.0415 48.5824 22.0456 49.436C21.0497 50.2896 19.5504 50.1743 18.6968 49.1784L1.81648 29.4847C-0.165637 27.1723 -0.165636 23.7599 1.81648 21.4475L18.6968 1.75381C19.5504 0.757907 21.0497 0.642573 22.0456 1.4962C23.0415 2.34983 23.1569 3.84917 22.3032 4.84507L5.42295 24.5387Z"
              fill="#171717"
            />
          </svg>
        </button>

        <div className="slider-viewport">
          <div
            className="slider-track"
            style={{
              transform: `translateX(calc(-${startIndex} * var(--slide-width)))`,
            }}
          >
            {cards.map((card, index) => (
              <div
                className={`card ${
                  index === startIndex + 1 ? "highlighted" : ""
                }`}
                key={index}
              >
                <div className="card-top-part">
                  <img src={card.image} alt={card.name} />
                  <div>
                    <h1>{card.name}</h1>
                    <p>{card.date}</p>
                  </div>
                </div>
                <h6 className="card-title">{card.title}</h6>
                <p className="card-desc">{card.desc}</p>
              </div>
            ))}
          </div>
        </div>

        <button onClick={showNext} className="nav-button"></button>
      </div>
    </div>
  );
};

export default HomeProductsCarousel;
