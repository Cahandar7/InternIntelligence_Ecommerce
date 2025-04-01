import { useEffect, useState, useContext } from "react";
import { motion } from "framer-motion";
import banner_img1 from "../assets/images/home_banner1.png";
import banner_img2 from "../assets/images/home_banner2.png";
import banner_img3 from "../assets/images/home_banner3.png";
import banner_img4 from "../assets/images/home_banner4.png";
import { Link } from "react-router-dom";
import { LanguageContext } from "../contexts/LanguageContext";

const images1 = [banner_img1, banner_img2];
const images2 = [banner_img3, banner_img4];

const fadeVariants = {
  "fade-left": {
    initial: { opacity: 0, x: -100 },
    animate: { opacity: 1, x: 0 },
    transition: { duration: 1, ease: "easeInOut", delay: 0.3 },
  },
  "fade-right": {
    initial: { opacity: 0, x: 100 },
    animate: { opacity: 1, x: 0 },
    transition: { duration: 1, ease: "easeInOut", delay: 0.3 },
  },
};

const HeroBanner = ({ images, opacity, content, bg_effect }) => {
  const [xPosition, setXPosition] = useState(0);
  const [yPosition, setYPosition] = useState(0);

  const handleMouseMove = (e) => {
    const { clientX, clientY, currentTarget } = e;
    const { left, top, width, height } = currentTarget.getBoundingClientRect();
    const xMove = ((clientX - left) / width - 0.5) * 60;
    const yMove = ((clientY - top) / height - 0.5) * 60;

    setXPosition(xMove);
    setYPosition(yMove);
  };

  const resetPosition = () => {
    setXPosition(0);
    setYPosition(0);
  };

  return (
    <>
      <div className={`${bg_effect}`}>
        <div id={`${bg_effect}-1`}></div>
        <div id={`${bg_effect}-2`}></div>
        <div id={`${bg_effect}-3`}></div>
      </div>

      <div
        className="hero-container"
        onMouseMove={handleMouseMove}
        onMouseLeave={resetPosition}
      >
        <motion.div
          className="hero-banner"
          animate={{ opacity: opacity }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
        >
          {images.map((image, index) => {
            const variantKey =
              fadeVariants[index % 2 === 0 ? "fade-left" : "fade-right"];
            return (
              <motion.div
                className="image-card"
                key={index}
                animate={{
                  x: xPosition,
                  y: yPosition,
                }}
                transition={{ type: "spring", stiffness: 500, damping: 15 }}
              >
                <motion.div
                  key={index}
                  variants={variantKey}
                  initial="initial"
                  animate="animate"
                  transition={{
                    duration: 1,
                    ease: "easeInOut",
                    delay: 1,
                  }}
                >
                  <img
                    src={image}
                    alt="Banner"
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                      objectPosition: "top",
                    }}
                  />
                </motion.div>
              </motion.div>
            );
          })}
          <motion.div
            className="banner-content"
            animate={{
              x: xPosition / 2,
              y: yPosition / 2,
            }}
            transition={{ type: "spring", stiffness: 400, damping: 15 }}
          >
            <motion.div
              initial={{ opacity: 0, y: 100 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                stiffness: 0,
                damping: 0,
                duration: 1,
                delay: 2,
              }}
            >
              <p>{content.subheading}</p>
              <h1 className="banner-heading">{content.heading}</h1>
              <h1 className="banner-heading">
                {content.symbol ? <span>{content.symbol}</span> : ""}
              </h1>
              <h1 className="banner-heading">{content.heading2}</h1>
              <p className="banner-description">{content.description}</p>
              <Link to={"/shop"} className="banner-btn">
                {content.buttonText}
              </Link>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </>
  );
};

const HomeBanner = () => {
  const { language } = useContext(LanguageContext);
  const [currentBannerIndex, setCurrentBannerIndex] = useState(0);
  const [opacity, setOpacity] = useState(1);
  const [fadeKey, setFadeKey] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const slides = [
    {
      images: images1,
      bg_effect: "first-bg",
      content: {
        heading:
          language === "en"
            ? "HOODIES"
            : language === "ru"
            ? "Толстовки"
            : "Kapüşonlu Yengilər",
        heading2:
          language === "en"
            ? "JACKETS"
            : language === "ru"
            ? "Куртки"
            : "Jaketlər",
        symbol: "&",
        subheading:
          language === "en"
            ? "CASUAL SHIRTS"
            : language === "ru"
            ? "Повседневные рубашки"
            : "Gündəlik köynəklər",
        description:
          language === "en"
            ? "8THEME QUALITY GOODS"
            : language === "ru"
            ? "Товары качества 8THEME"
            : "8THEME KEYFİYYƏT MƏHSULLARI",
        buttonText:
          language === "en"
            ? "READ MORE"
            : language === "ru"
            ? "Читать далее"
            : "Daha çox oxu",
      },
    },
    {
      images: images2,
      bg_effect: "second-bg",
      content: {
        heading:
          language === "en"
            ? "LOVE THE"
            : language === "ru"
            ? "ЛЮБИТЕ"
            : "SEVİN",
        heading2:
          language === "en"
            ? "COLORS"
            : language === "ru"
            ? "ЦВЕТА"
            : "RƏNGLƏR",
        symbol: "",
        subheading:
          language === "en"
            ? "SWEATSHIRTS 2016"
            : language === "ru"
            ? "СВИТШОТЫ 2016"
            : "SWETŞİRTLƏR 2016",
        description:
          language === "en"
            ? "STYLE AND COMFORT"
            : language === "ru"
            ? "СТИЛЬ И КОМФОРТ"
            : "STİL VƏ RAHATLIQ",
        buttonText:
          language === "en"
            ? "READ MORE"
            : language === "ru"
            ? "Читать далее"
            : "Daha çox oxu",
      },
    },
  ];

  const handlePrevNext = () => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setOpacity(0);

    setTimeout(() => {
      setCurrentBannerIndex((prevIndex) => (prevIndex + 1) % slides.length);
      setFadeKey((prevKey) => prevKey + 1);
      setOpacity(1);

      setIsTransitioning(false);
    }, 300);
  };

  useEffect(() => {
    const interval = setInterval(handlePrevNext, 10000);
    return () => clearInterval(interval);
  }, [isTransitioning]);

  return (
    <div className="carousel-container">
      <HeroBanner
        key={fadeKey}
        images={slides[currentBannerIndex].images}
        bg_effect={slides[currentBannerIndex].bg_effect}
        opacity={opacity}
        content={slides[currentBannerIndex].content}
      />
      <div className="carousel-controls">
        <button className="prev-btn" onClick={handlePrevNext}>
          {"<"}
        </button>
        <button className="next-btn" onClick={handlePrevNext}>
          {">"}
        </button>
      </div>
      <div className="slider-indicators">
        <div
          className={`indicator ${currentBannerIndex === 0 ? "active" : ""}`}
        ></div>
        <div
          className={`indicator ${currentBannerIndex === 1 ? "active" : ""}`}
        ></div>
      </div>
    </div>
  );
};

export default HomeBanner;
