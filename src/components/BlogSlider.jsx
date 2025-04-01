import React, { useContext } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import blog_card1 from "../assets/images/blog_card1.png";
import blog_card2 from "../assets/images/blog_card2.png";
import blog_card3 from "../assets/images/blog_card3.png";
import blog_card4 from "../assets/images/blog_card4.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendarDays } from "@fortawesome/free-solid-svg-icons";
import { faMessage } from "@fortawesome/free-solid-svg-icons/faMessage";
import { Link, useNavigate } from "react-router-dom";
import { LanguageContext } from "../contexts/LanguageContext";

const BlogSlider = () => {
  const navigate = useNavigate();
  const { language } = useContext(LanguageContext);

  return (
    <div style={{ width: "80%" }}>
      <Swiper
        spaceBetween={30}
        slidesPerView={3}
        loop={false}
        breakpoints={{
          1024: {
            slidesPerView: 3,
          },
          768: {
            slidesPerView: 2,
          },
          480: {
            slidesPerView: 1,
          },
        }}
      >
        <SwiperSlide>
          <div
            className="blog-card"
            onClick={() => {
              navigate("/blog");
            }}
          >
            <img src={blog_card1} alt="Blog 1" />
            <h3>
              {language === "en"
                ? "How to Improve Your E-commerce Business in 2023"
                : language === "ru"
                ? "Как улучшить свой бизнес в электронной коммерции в 2023 году"
                : "2023-cü ildə E-ticarət biznesinizi necə yaxşılaşdırmaq olar"}
            </h3>
            <h1>
              <FontAwesomeIcon icon={faCalendarDays} />
              March 22, 2023
              <FontAwesomeIcon icon={faMessage} />
              <span>12</span>
            </h1>
            <p>
              {language === "en"
                ? "Discover the latest trends and tips for growing your online store. From customer engagement to advanced marketing strategies, learn how to maximize your success in the e-commerce world."
                : language === "ru"
                ? "Откройте для себя последние тенденции и советы по развитию вашего интернет-магазина. От взаимодействия с клиентами до передовых маркетинговых стратегий — узнайте, как максимально увеличить свой успех в мире электронной коммерции."
                : "Son zamanlar müştəri əlaqələri və qabaqcıl marketinq strategiyalarından başlayaraq, onlayn mağazanızı inkişaf etdirmək üçün ən son meyllər və məsləhətlərdən xəbərdar olun. E-ticarət dünyasında uğurunuzu necə artırmaq barədə öyrənin."}
            </p>
            <Link to={"/blog"} className="blog-card-link">
              {language === "en"
                ? "Continue Reading"
                : language === "ru"
                ? "Читать дальше"
                : "Oxumağa davam"}{" "}
              <span>{">"}</span>
            </Link>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="blog-card">
            <img src={blog_card2} alt="Blog 2" />
            <h3>
              {language === "en"
                ? "The Future of Online Shopping: What You Need to Know"
                : language === "ru"
                ? "Будущее онлайн-покупок: что вам нужно знать"
                : "Onlayn alış-verişin gələcəyi: Bilməli olduğunuz hər şey"}
            </h3>
            <h1>
              <FontAwesomeIcon icon={faCalendarDays} />
              February 28, 2023
              <FontAwesomeIcon icon={faMessage} />
              <span>8</span>
            </h1>
            <p>
              {language === "en"
                ? "As online shopping continues to evolve, understanding the future trends will help businesses stay ahead of the competition. From AI-powered recommendations to faster checkout processes, get ready for the next big thing in e-commerce."
                : language === "ru"
                ? "Поскольку онлайн-шопинг продолжает развиваться, понимание будущих тенденций поможет компаниям опережать конкурентов. От рекомендаций на базе ИИ до более быстрых процессов оформления заказа — приготовьтесь к следующему большому шагу в электронной коммерции."
                : "Onlayn alış-veriş inkişaf etməyə davam etdikcə, gələcək tendensiyaları anlamaq bizneslərə rəqabətə qarşı üstünlük təmin edəcək. Süni intellektə əsaslanan tövsiyələrdən daha sürətli ödəniş proseslərinə qədər, e-ticarət sahəsində növbəti böyük dəyişiklik üçün hazırsınız."}
            </p>
            <Link to={"/blog"} className="blog-card-link">
              {language === "en"
                ? "Continue Reading"
                : language === "ru"
                ? "Читать дальше"
                : "Oxumağa davam"}{" "}
              <span>{">"}</span>
            </Link>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="blog-card">
            <img src={blog_card3} alt="Blog 3" />
            <h3>
              {language === "en"
                ? "How to Build a Successful Marketing Strategy for Your Online Store"
                : language === "ru"
                ? "Как построить успешную маркетинговую стратегию для вашего интернет-магазина"
                : "Onlayn Mağazanız üçün Uğurlu Marketinq Strategiyası Qurmağın Yolu"}
            </h3>
            <h1>
              <FontAwesomeIcon icon={faCalendarDays} />
              January 15, 2023
              <FontAwesomeIcon icon={faMessage} />
              <span>5</span>
            </h1>
            <p>
              {language === "en"
                ? "Creating a strong marketing strategy is crucial for the success of your online store. Learn how to create effective ads, engage customers, and optimize your campaigns for maximum results."
                : language === "ru"
                ? "Создание сильной маркетинговой стратегии имеет решающее значение для успеха вашего интернет-магазина. Узнайте, как создавать эффективные объявления, привлекать клиентов и оптимизировать кампании для достижения максимальных результатов."
                : "Güclü bir marketinq strategiyası yaratmaq onlayn mağazanızın uğuru üçün vacibdir. Effektiv reklamlar yaratmağı, müştəriləri cəlb etməyi və kampaniyalarınızı maksimum nəticələr üçün optimallaşdırmağı öyrənin."}
            </p>
            <Link to={"/blog"} className="blog-card-link">
              {language === "en"
                ? "Continue Reading"
                : language === "ru"
                ? "Читать дальше"
                : "Oxumağa davam"}{" "}
              <span>{">"}</span>
            </Link>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="blog-card">
            <img src={blog_card4} alt="Blog 4" />
            <h3>
              {language === "en"
                ? "Top Trends in E-commerce You Should Watch in 2023"
                : language === "ru"
                ? "Топ трендов в электронной коммерции, которые стоит следить в 2023 году"
                : "2023-cü ildə izləməli olduğunuz E-ticarət sahəsindəki Ən Yaxşı Trendlər"}
            </h3>
            <h1>
              <FontAwesomeIcon icon={faCalendarDays} />
              April 5, 2023
              <FontAwesomeIcon icon={faMessage} />
              <span>3</span>
            </h1>
            <p>
              {language === "en"
                ? "Stay ahead of the game by keeping an eye on the latest trends in e-commerce. From voice search optimization to augmented reality shopping experiences, this blog explores the future of online shopping."
                : language === "ru"
                ? "Будьте в курсе последних тенденций в электронной коммерции, чтобы опережать конкурентов. От оптимизации голосового поиска до использования дополненной реальности в покупках — этот блог исследует будущее онлайн-шопинга."
                : "E-ticarət sahəsindəki ən son tendensiyaları izləyərək rəqabətdə qabaqda olun. Səsli axtarış optimallaşdırılmasından tutmuş artırılmış reallıq alış-veriş təcrübələrinə qədər bu bloq onlayn alış-verişin gələcəyini araşdırır."}
            </p>
            <Link to={"/blog"} className="blog-card-link">
              {language === "en"
                ? "Continue Reading"
                : language === "ru"
                ? "Читать дальше"
                : "Oxumağa davam"}{" "}
              <span>{">"}</span>
            </Link>
          </div>
        </SwiperSlide>
      </Swiper>
    </div>
  );
};

export default BlogSlider;
