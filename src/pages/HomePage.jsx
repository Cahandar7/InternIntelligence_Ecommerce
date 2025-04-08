import React, { useContext } from "react";
import HomeBanner from "../components/HomeBanner";
import shine_img1 from "../assets/images/shine_card_img1.png";
import shine_img2 from "../assets/images/shine_card_img2.png";
import shine_img3 from "../assets/images/shine_card_img3.png";
import Marquee from "react-fast-marquee";
import BlogSlider from "../components/BlogSlider";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import ProductCard from "../components/ProductCard";
import { Swiper, SwiperSlide } from "swiper/react";
import { LanguageContext } from "../contexts/LanguageContext";
import { ThemeContext } from "../contexts/ThemeContext";

const HomePage = () => {
  const products = useSelector((p) => p);
  const { language } = useContext(LanguageContext);
  const { theme } = useContext(ThemeContext);

  return (
    <div className={`page ${theme}`}>
      <HomeBanner />

      <div className="shine-cards">
        <div style={{ textAlign: "left", paddingLeft: "13px" }}>
          <img src={shine_img1} alt="shine_img1" />
          <p>
            {language === "en"
              ? "ACCESSORIES"
              : language === "ru"
              ? "АКСЕССУАРЫ"
              : "Aksesuarlar"}
          </p>
          <h2>
            {language === "en"
              ? "NEW GATEWAY"
              : language === "ru"
              ? "НОВЫЙ ПРОХОД"
              : "YENİ KEÇİD"}
          </h2>
          <h2>
            {language === "en"
              ? "GOLD WATCH"
              : language === "ru"
              ? "ЗОЛОТЫЕ ЧАСЫ"
              : "Qızıl Saat"}
          </h2>
        </div>
        <div style={{ textAlign: "center" }}>
          <img src={shine_img2} alt="shine_img2" />
          <p>
            {language === "en"
              ? "ACCESSORIES"
              : language === "ru"
              ? "АКСЕССУАРЫ"
              : "Aksesuarlar"}
          </p>
          <h1>
            {language === "en" ? "SPRING" : language === "ru" ? "ВЕСНА" : "YAZ"}
          </h1>
          <h2>
            {language === "en"
              ? "2016 IS COMING"
              : language === "ru"
              ? "2016 ГОД ПРИХОДИТ"
              : "2016 GƏLİR"}
          </h2>
        </div>
        <div style={{ textAlign: "right", paddingRight: "13px" }}>
          <img src={shine_img3} alt="shine_img3" />
          <p>
            {language === "en"
              ? "ACCESSORIES"
              : language === "ru"
              ? "АКСЕССУАРЫ"
              : "Aksesuarlar"}
          </p>
          <h2>
            {language === "en"
              ? "NEW GATEWAY"
              : language === "ru"
              ? "НОВЫЙ ПРОХОД"
              : "YENİ KEÇİD"}
          </h2>
          <h2>
            {language === "en"
              ? "GOLD WATCH"
              : language === "ru"
              ? "ЗОЛОТЫЕ ЧАСЫ"
              : "Qızıl Saat"}
          </h2>
        </div>
      </div>

      <div className="products-slider-container">
        <div className="texts">
          <h1>
            {language === "en"
              ? "TOP INTERESTING"
              : language === "ru"
              ? "ТОП ИНТЕРЕСНЫЕ"
              : "ƏN MARAQLI"}
          </h1>
          <p>
            {language === "en"
              ? "Browse the collection of our dark best selling and top interesting products. You’ll definitely find what you are looking for."
              : language === "ru"
              ? "Просмотрите коллекцию наших самых популярных и интересных товаров. Вы точно найдете то, что ищете."
              : "Ən çox satılan və maraqlı məhsullarımızın kolleksiyasını gəzin. Axtardığınızı tapacaqsınız."}
          </p>
        </div>
        <Swiper
          style={{ width: "70%" }}
          spaceBetween={0}
          slidesPerView={3}
          loop={false}
          breakpoints={{
            1024: { slidesPerView: 3 },
            768: { slidesPerView: 2 },
            480: { slidesPerView: 1 },
          }}
        >
          {products
            .filter((el) => el.rating > 9)
            .map((item, index) => (
              <SwiperSlide key={index}>
                <ProductCard
                  image={item.image}
                  title={item.title}
                  category={item.category}
                  brand={item.brand}
                  price={item.price}
                  alldata={item}
                />
              </SwiperSlide>
            ))}
        </Swiper>
      </div>

      <Marquee
        speed={100}
        gradient={false}
        pauseOnHover={false}
        className={`strip-container ${theme}`}
      >
        {language === "en"
          ? "Welcome to Xstore - Your One-Stop Shop! Free Shipping Over $50! Exclusive Deals Available Now! Trusted by Thousands! New Arrivals Every Week!"
          : language === "ru"
          ? "Добро пожаловать в Xstore - ваш универсальный магазин! Бесплатная доставка при заказе от $50! Эксклюзивные предложения уже доступны! Доверяют тысячи клиентов! Новые поступления каждую неделю!"
          : "Xstore-a xoş gəlmisiniz - Sizin Bir-Stop Mağazanız! $50-dən yuxarı sifarişlərə pulsuz çatdırılma! İndi Eksklüziv Təkliflər Mövcuddur! Minlərlə Müştəri Tərəfindən Etibar Edilir! Hər Həftə Yeni Gəlişlər!"}
      </Marquee>

      <div className="texts-section">
        <div className="first">
          <h2>.01</h2>
          <h3 className={`${theme}`}>
            {language === "en"
              ? "MAKE YOUR ORDER"
              : language === "ru"
              ? "Сделайте заказ"
              : "Sifarişinizi Verin"}
          </h3>
          <p>
            {language === "en"
              ? "Browse through our wide range of products and select your favorite items. Once you've made your choice, simply add them to your cart and proceed to checkout."
              : language === "ru"
              ? "Просмотрите наш широкий ассортимент товаров и выберите ваши любимые. После того, как вы сделали выбор, просто добавьте их в корзину и перейдите к оформлению заказа."
              : "Geniş məhsul çeşidimizi nəzərdən keçirin və sevdiyiniz əşyaları seçin. Seçiminizi etdikdən sonra onları səbətə əlavə edib ödəmə prosesinə keçin."}
          </p>
          <Link to={"/about"}>
            {language === "en"
              ? "READ MORE"
              : language === "ru"
              ? "Читать далее"
              : "Daha çox oxu"}
          </Link>
        </div>
        <div className="second">
          <h2>.02</h2>
          <h3 className={`${theme}`}>
            {language === "en"
              ? "PAYMENT PROCESS"
              : language === "ru"
              ? "Процесс оплаты"
              : "Ödəniş Prosesi"}
          </h3>
          <p>
            {language === "en"
              ? "Select the most convenient and secure payment method for your order. We offer a variety of payment options to suit your preferences."
              : language === "ru"
              ? "Выберите наиболее удобный и безопасный способ оплаты для вашего заказа. Мы предлагаем различные варианты оплаты на ваш выбор."
              : "Sifarişiniz üçün ən rahat və təhlükəsiz ödəmə üsulunu seçin. Sizin seçimlərinizə uyğun müxtəlif ödəmə variantları təklif edirik."}
          </p>
          <Link to={"/about"}>
            {language === "en"
              ? "READ MORE"
              : language === "ru"
              ? "Читать далее"
              : "Daha çox oxu"}
          </Link>
        </div>
        <div className="third">
          <h2>.03</h2>
          <h3 className={`${theme}`}>
            {language === "en"
              ? "24H UK DELIVERY"
              : language === "ru"
              ? "Доставка по Великобритании за 24 часа"
              : "Böyük Britaniyada 24 saat çatdırılma"}
          </h3>
          <p>
            {language === "en"
              ? "We provide fast and reliable 24-hour delivery within the UK. Get your products delivered right to your door, anytime."
              : language === "ru"
              ? "Мы предоставляем быструю и надежную доставку по Великобритании за 24 часа. Получите свои товары прямо к двери в любое время."
              : "Böyük Britaniya daxilində sürətli və etibarlı 24 saat çatdırılma təklif edirik. Məhsullarınızı hər zaman qapınıza çatdırın."}
          </p>
          <Link to={"/about"}>
            {language === "en"
              ? "READ MORE"
              : language === "ru"
              ? "Читать далее"
              : "Daha çox oxu"}
          </Link>
        </div>
      </div>

      <div className={`blog-slider-container ${theme}`}>
        <div className="texts">
          <h1>
            {language === "en"
              ? "LATEST FROM OUR BLOG"
              : language === "ru"
              ? "Последние новости из нашего блога"
              : "Bloqumuzdan ən son yeniliklər"}
          </h1>
          <p>
            {language === "en"
              ? "Stay updated with the latest articles, trends, and news from our blog. We cover a variety of topics to keep you informed."
              : language === "ru"
              ? "Оставайтесь в курсе последних статей, тенденций и новостей из нашего блога. Мы охватываем различные темы, чтобы держать вас в курсе."
              : "Bloqumuzdan ən son məqalələr, tendensiyalar və xəbərlərlə tanış olun. Sizi məlumatlandırmaq üçün müxtəlif mövzuları əhatə edirik."}
          </p>
        </div>
        <BlogSlider />
      </div>
    </div>
  );
};

export default HomePage;
