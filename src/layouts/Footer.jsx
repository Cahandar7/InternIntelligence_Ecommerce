import React, { useContext } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendarDays } from "@fortawesome/free-solid-svg-icons"; // Correct import for the calendar icon
import { faMessage } from "@fortawesome/free-solid-svg-icons/faMessage";
import { Link } from "react-router-dom";
import footer_payments from "../assets/images/footer-payments.png";
import { LanguageContext } from "../contexts/LanguageContext";

const Footer = () => {
  const { language } = useContext(LanguageContext);

  return (
    <div className="footer">
      <div className="top-footer">
        <div className="column1">
          <img src="src/assets/images/xstore_logo.png" alt="XStore Logo" />
          <p>
            {language === "en"
              ? "This is easy to update text from footer widget area. Add here information about your store."
              : language === "ru"
              ? "Это легко обновляемый текст в области виджета подвала. Добавьте информацию о вашем магазине."
              : "Bu, altbilgi vidcet sahəsindən asanlıqla yenilənə bilən mətndir. Mağazanız haqqında məlumatı burada əlavə edin."}
          </p>
          <div>
            <span>48 Park Avenue, </span>
            <span>New York NY 10016</span>
            <span>Email: youremail@site.com</span>
            <span>Phone: +1 408 996 1010</span>
          </div>
        </div>
        <div className="column2">
          <h5>
            {language === "en"
              ? "USEFUL LINKS"
              : language === "ru"
              ? "ПОЛЕЗНЫЕ ССЫЛКИ"
              : "FAYDALI ƏLAQƏLƏR"}
          </h5>
          <hr />
          <div>
            <ul>
              <li>
                <Link to={"/"}>
                  {language === "en"
                    ? "Home Page"
                    : language === "ru"
                    ? "Главная"
                    : "Ana səhifə"}
                </Link>
              </li>
              <li>
                <Link to={"/about"}>
                  {language === "en"
                    ? "About Us"
                    : language === "ru"
                    ? "О нас"
                    : "Haqqımızda"}
                </Link>
              </li>
              <li>
                <Link to={"/contact"}>
                  {language === "en"
                    ? "Contact Us"
                    : language === "ru"
                    ? "Контакты"
                    : "Əlaqə"}
                </Link>
              </li>
              <li>
                <Link to={"/blog"}>
                  {language === "en"
                    ? "Blog"
                    : language === "ru"
                    ? "Блог"
                    : "Bloq"}
                </Link>
              </li>
              <li>
                <Link to={"/faq"}>FAQs</Link>
              </li>
              <li>
                <Link to={"/account"}>
                  {language === "en"
                    ? "My Account"
                    : language === "ru"
                    ? "Мой аккаунт"
                    : "Hesabım"}
                </Link>
              </li>
              <li>
                <Link to={"/"}>
                  {language === "en"
                    ? "Conditions"
                    : language === "ru"
                    ? "Условия"
                    : "Şərtlər"}
                </Link>
              </li>
            </ul>
            <ul>
              <li>
                <Link to={"contact"}>
                  {language === "en"
                    ? "London"
                    : language === "ru"
                    ? "Лондон"
                    : "London"}
                </Link>
              </li>
              <li>
                <Link to={"contact"}>
                  {language === "en"
                    ? "San Francisco"
                    : language === "ru"
                    ? "Сан-Франциско"
                    : "San Fransisko"}
                </Link>
              </li>
              <li>
                <Link to={"contact"}>
                  {language === "en"
                    ? "New Orleans"
                    : language === "ru"
                    ? "Новый Орлеан"
                    : "Yeni Orlean"}
                </Link>
              </li>
              <li>
                <Link to={"contact"}>
                  {language === "en"
                    ? "Seattle"
                    : language === "ru"
                    ? "Сиэтл"
                    : "Sietl"}
                </Link>
              </li>
              <li>
                <Link to={"contact"}>
                  {language === "en"
                    ? "Portland"
                    : language === "ru"
                    ? "Портленд"
                    : "Portlend"}
                </Link>
              </li>
              <li>
                <Link to={"contact"}>
                  {language === "en"
                    ? "Stockholm"
                    : language === "ru"
                    ? "Стокгольм"
                    : "Stokholm"}
                </Link>
              </li>
              <li>
                <Link to={"contact"}>
                  {language === "en"
                    ? "Hoffenheim"
                    : language === "ru"
                    ? "Хоффенхайм"
                    : "Hoffenheim"}
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="column3">
          <h5>
            {language === "en"
              ? "RECENT POSTS"
              : language === "ru"
              ? "ПОСЛЕДНИЕ ПОСТЫ"
              : "SON DƏRGLƏR"}
          </h5>
          <hr />
          <div>
            <h3>Consectetur aliquet</h3>
            <h1>
              <FontAwesomeIcon icon={faCalendarDays} />
              February 17, 2016
              <FontAwesomeIcon icon={faMessage} />
              <span>0</span>
            </h1>
          </div>
          <div>
            <h3>Consectetur vestibulum aliquet</h3>
            <h1>
              <FontAwesomeIcon icon={faCalendarDays} />
              February 17, 2016
              <FontAwesomeIcon icon={faMessage} />
              <span>0</span>
            </h1>
          </div>
          <div>
            <h3>Ullamcorper vestibulum</h3>
            <h1>
              <FontAwesomeIcon icon={faCalendarDays} />
              February 17, 2016
              <FontAwesomeIcon icon={faMessage} />
              <span>0</span>
            </h1>
          </div>
        </div>
        <div className="column4">
          <h5>
            {language === "en"
              ? "PRODUCT TAGS"
              : language === "ru"
              ? "ТЕГИ ТОВАРОВ"
              : "MƏHSUL YAZILARI"}
          </h5>
          <hr />
          <div>
            <Link to={"/"} className="tag-link">
              {language === "en"
                ? "accessories"
                : language === "ru"
                ? "аксессуары"
                : "aksesuarlar"}
            </Link>
            <Link to={"/"} className="tag-link">
              {language === "en"
                ? "black"
                : language === "ru"
                ? "черный"
                : "qara"}
            </Link>
          </div>
          <div>
            <Link to={"/"} className="tag-link">
              {language === "en" ? "look" : language === "ru" ? "вид" : "baxış"}
            </Link>
            <Link to={"/"} className="tag-link">
              {language === "en"
                ? "look2"
                : language === "ru"
                ? "вид2"
                : "baxış2"}
            </Link>
            <Link to={"/"} className="tag-link">
              {language === "en"
                ? "look3"
                : language === "ru"
                ? "вид3"
                : "baxış3"}
            </Link>
          </div>
          <div>
            <Link to={"/"} className="tag-link">
              {language === "en" ? "new" : language === "ru" ? "новый" : "yeni"}
            </Link>
            <Link to={"/"} className="tag-link">
              {language === "en"
                ? "sale"
                : language === "ru"
                ? "распродажа"
                : "endirim"}
            </Link>
            <Link to={"/"} className="tag-link">
              {language === "en"
                ? "week"
                : language === "ru"
                ? "неделя"
                : "həftə"}
            </Link>
          </div>
          <div>
            <Link to={"/"} className="tag-link">
              {language === "en"
                ? "fashion"
                : language === "ru"
                ? "мода"
                : "moda"}
            </Link>
            <Link to={"/"} className="tag-link">
              {language === "en"
                ? "illegal"
                : language === "ru"
                ? "незаконный"
                : "qanunsuz"}
            </Link>
          </div>
        </div>
      </div>
      <div className="sub-footer">
        <div className="foot text">
          <span>
            <p>
              {language === "en"
                ? "Copyright © 2024 XStore theme. Created by 8theme - WordPress"
                : language === "ru"
                ? "Авторские права © 2024 XStore theme. Создано 8theme - WordPress"
                : "Müəllif hüquqları © 2024 XStore mövzusu. Yaradılmışdır 8theme - WordPress"}
            </p>
            <p>
              {language === "en"
                ? "WooCommerce themes."
                : language === "ru"
                ? "Темы WooCommerce."
                : "WooCommerce mövzuları."}
            </p>
          </span>
        </div>
        <div className="foot">
          <img src={footer_payments} alt="footer_payments_image" />
        </div>
      </div>
    </div>
  );
};

export default Footer;
