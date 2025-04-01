import React, { useContext } from "react";
import about_us_img1 from "../assets/images/about_us_img1.png";
import about_us_img2 from "../assets/images/about_us_img2.png";
import { NavLink } from "react-router-dom";
import { LanguageContext } from "../contexts/LanguageContext";

const AboutUsPage = () => {
  const { language } = useContext(LanguageContext);

  return (
    <div className="page">
      <div className="about-us-hero">
        <img src={about_us_img1} alt="about_us_img1" />
        <div className="hero-texts">
          <h6>
            <NavLink to={"/"} className="nav">
              {language === "en"
                ? "Home"
                : language === "ru"
                ? "Главная"
                : "Ana səhifə"}
            </NavLink>
            &gt;
          </h6>
          <h3>
            {language === "en"
              ? "About Us"
              : language === "ru"
              ? "О нас"
              : "Haqqımızda"}
          </h3>
        </div>
      </div>
      <div className="about-us-banner">
        <img src={about_us_img2} alt="about_us_img2" />
        <div className="banner-texts">
          <div className="texts">
            <div className="top-text">
              <h3>
                {language === "en"
                  ? "Our Core Values: Excellence, Innovation, and Customer Satisfaction"
                  : language === "ru"
                  ? "Наши основные ценности: превосходство, инновации и удовлетворенность клиентов"
                  : "Köklü Dəyərlərimiz: Mükəmməllik, İnnovasiya və Müştəri Məmnuniyyəti"}
              </h3>
              <p>
                {language === "en"
                  ? "At our company, we prioritize excellence in every aspect of our work. Our team is dedicated to driving innovation and offering exceptional customer experiences. With a focus on quality, we strive to exceed expectations in everything we do."
                  : language === "ru"
                  ? "В нашей компании мы придаем большое значение совершенству во всех аспектах нашей работы. Наша команда стремится к инновациям и предлагает исключительный опыт для клиентов. С акцентом на качество, мы стремимся превзойти ожидания в каждом проекте."
                  : "Bizim şirkətdə biz hər bir işin aspektində mükəmməlliyə önəm veririk. Komandamız innovasiyaları idarə etməyə və müstəsna müştəri təcrübələri təqdim etməyə həsr olunub. Keyfiyyətə fokuslanaraq, hər işimizdə gözləntiləri aşmağa çalışırıq."}
              </p>
            </div>
            <div className="midbot-text">
              <div className="left">
                <h5>
                  <span>.01</span>
                  {language === "en"
                    ? "PASSION"
                    : language === "ru"
                    ? "СТРАСТЬ"
                    : "HEYƏCAN"}
                </h5>
                <p>
                  {language === "en"
                    ? "Passion is the foundation of our success. Our team is driven by a deep love for what we do. Whether it’s creating groundbreaking products or providing world-class service, we approach everything with enthusiasm and dedication."
                    : language === "ru"
                    ? "Страсть - это основа нашего успеха. Наша команда движется глубокой любовью к тому, что мы делаем. Будь то создание революционных продуктов или предоставление мирового уровня сервиса, мы подходим к каждому делу с энтузиазмом и преданностью."
                    : "Heyəcan bizim uğurumuzun təməlidir. Komandamız etdiyimiz işə dərin bir sevgi ilə hərəkət edir. İstər inqilabi məhsullar yaratmaq, istərsə də dünya səviyyəsində xidmət göstərmək olsun, hər şeyə böyük həvəs və həsrət ilə yanaşırıq."}
                </p>
              </div>
              <div className="right">
                <h5>
                  <span>.02</span>
                  {language === "en"
                    ? "DILIGENCE"
                    : language === "ru"
                    ? "ТРУДОЛЮБИЕ"
                    : "SƏYLƏ"}
                </h5>
                <p>
                  {language === "en"
                    ? "Diligence means working with determination and attention to detail. We believe in putting in the effort to ensure that every project we undertake is completed with the highest standards of excellence."
                    : language === "ru"
                    ? "Трудолюбие означает работу с решимостью и вниманием к деталям. Мы верим в то, что нужно прикладывать усилия, чтобы каждый проект, который мы беремся выполнять, был завершен с наивысшими стандартами качества."
                    : "Səylə işləmək qərarlılıq və detallara diqqət göstərmək deməkdir. Biz inanırıq ki, hər bir layihəni ən yüksək keyfiyyət standartlarına uyğun başa çatdırmaq üçün əlimizdən gələni etməliyik."}
                </p>
              </div>
            </div>
            <div className="midbot-text">
              <div className="left">
                <h5>
                  <span>.03</span>
                  {language === "en"
                    ? "PRECISION"
                    : language === "ru"
                    ? "ТОЧНОСТЬ"
                    : "DƏqiQLİK"}
                </h5>
                <p>
                  {language === "en"
                    ? "Precision is essential in delivering results. We focus on accuracy in every task, whether it’s product development, customer service, or any other area of our work."
                    : language === "ru"
                    ? "Точность необходима для достижения результатов. Мы сосредотачиваемся на точности в каждой задаче, будь то разработка продукта, обслуживание клиентов или любая другая область нашей работы."
                    : "Dəqiqlik nəticələr əldə etməkdə vacibdir. Biz hər bir işdə, istər məhsul inkişafı, istər müştəri xidməti, istərsə də digər sahələrdə dəqiqliyə diqqət yetiririk."}
                </p>
              </div>
              <div className="right">
                <h5>
                  <span>.04</span>
                  {language === "en"
                    ? "INSPIRATION"
                    : language === "ru"
                    ? "ВДОХНОВЕНИЕ"
                    : "İLHAM"}
                </h5>
                <p>
                  {language === "en"
                    ? "Inspiration is what keeps us pushing boundaries. We draw motivation from our experiences, our customers, and our desire to continually improve. Our goal is to inspire others and create a positive impact on those around us."
                    : language === "ru"
                    ? "Вдохновение - это то, что помогает нам расширять границы. Мы черпаем мотивацию из наших опытов, наших клиентов и стремления постоянно совершенствоваться. Наша цель - вдохновлять других и создавать положительное влияние на окружающих."
                    : "İlham bizə sərhədləri aşmağa kömək edən şeydir. Biz motivasiyanı təcrübələrimizdən, müştərilərimizdən və daima inkişaf etmək arzusundan alırıq. Məqsədimiz başqalarına ilham vermək və ətrafımızdakılara müsbət təsir yaratmaqdır."}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutUsPage;
