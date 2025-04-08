import React, { useContext } from "react";
import Accordion from "react-bootstrap/Accordion";
import AnimatedTopHero from "../components/AnimatedTopHero";
import { LanguageContext } from "../contexts/LanguageContext";
import { ThemeContext } from "../contexts/ThemeContext";

const FAQPage = () => {
  const { language } = useContext(LanguageContext);
  const { theme } = useContext(ThemeContext);

  return (
    <div className="page">
      <AnimatedTopHero page={"faq"} />
      <div className="faq-container">
        <Accordion defaultActiveKey={["0"]} alwaysOpen>
          <Accordion.Item eventKey="0">
            <Accordion.Header>
              {language === "en"
                ? "How do I create an account and get started with Xstore platform?"
                : language === "ru"
                ? "Как создать аккаунт и начать работать с платформой Xstore?"
                : "Xstore platformasında necə qeydiyyatdan keçib başlaya bilərəm?"}
            </Accordion.Header>
            <Accordion.Body>
              {language === "en"
                ? "To create an account, visit Xstore’s website and click 'Sign Up.' Enter your name, email, and password. You'll receive an email verification link—click it to confirm. After verifying, log in to your account and explore shopping or selling options. You can manage your profile, make purchases, or start selling by uploading product details."
                : language === "ru"
                ? "Для создания аккаунта перейдите на сайт Xstore и нажмите 'Регистрация'. Введите имя, email и пароль. Вам будет отправлено письмо для подтверждения—перейдите по ссылке в письме. После подтверждения войдите в аккаунт и начните покупки или продажи. Вы можете управлять профилем, совершать покупки или начать продавать, добавив товар."
                : "Hesab yaratmaq üçün Xstore saytını ziyarət edin və 'Qeydiyyatdan Keç' düyməsini basın. Adınızı, e-poçtunuzu və şifrənizi daxil edin. E-poçtunuza təsdiq linki göndəriləcək—linkə klikləyin. Təsdiq etdikdən sonra hesabınıza daxil olun və alış-veriş və ya satış etməyə başlayın. Profilinizi idarə edə, alış-veriş edə və məhsul əlavə edərək satışa başlaya bilərsiniz."}
            </Accordion.Body>
          </Accordion.Item>

          <Accordion.Item eventKey="1">
            <Accordion.Header>
              {language === "en"
                ? "What types of products can I buy or sell on Xstore?"
                : language === "ru"
                ? "Какие товары я могу купить или продать на Xstore?"
                : "Xstore platformasında hansı məhsulları ala və ya sata bilərəm?"}
            </Accordion.Header>
            <Accordion.Body>
              {language === "en"
                ? "Xstore allows you to buy and sell a variety of products including electronics, clothing, home goods, and more. Sellers can list new or used items. Browse categories or search for specific products."
                : language === "ru"
                ? "Xstore позволяет покупать и продавать разнообразные товары, включая электронику, одежду, товары для дома и многое другое. Продавцы могут размещать как новые, так и подержанные товары. Просматривайте категории или ищите конкретные товары."
                : "Xstore müxtəlif məhsullar almağa və satmağa imkan verir, o cümlədən elektronika, geyim, ev əşyaları və daha çox. Satıcılar yeni və ya istifadə olunmuş məhsulları satışa qoya bilərlər. Kateqoriyalara baxın və ya spesifik məhsulları axtarın."}
            </Accordion.Body>
          </Accordion.Item>

          <Accordion.Item eventKey="2">
            <Accordion.Header>
              {language === "en"
                ? "How can I track my orders and deliveries?"
                : language === "ru"
                ? "Как я могу отслеживать свои заказы и доставки?"
                : "Sifarişlərimi və çatdırılmalarımı necə izləyə bilərəm?"}
            </Accordion.Header>
            <Accordion.Body>
              {language === "en"
                ? "Once you place an order, Xstore provides a tracking number. Use this number to track the delivery status. Visit your order history to check the status of each purchase and delivery."
                : language === "ru"
                ? "После оформления заказа Xstore предоставит вам номер для отслеживания. Используйте этот номер, чтобы следить за состоянием доставки. Посетите историю заказов, чтобы проверить статус каждого из них."
                : "Sifariş verdikdən sonra, Xstore sizə izləmə nömrəsi təqdim edəcək. Bu nömrəni istifadə edərək çatdırılma vəziyyətini izləyə bilərsiniz. Hər bir sifarişin və çatdırılmanın vəziyyətini yoxlamaq üçün sifarişlər tarixinə daxil olun."}
            </Accordion.Body>
          </Accordion.Item>

          <Accordion.Item eventKey="3">
            <Accordion.Header>
              {language === "en"
                ? "How do I contact Xstore support?"
                : language === "ru"
                ? "Как я могу связаться с поддержкой Xstore?"
                : "Xstore dəstəyi ilə necə əlaqə saxlaya bilərəm?"}
            </Accordion.Header>
            <Accordion.Body>
              {language === "en"
                ? "For support, visit Xstore’s contact page. You can reach out through live chat, email, or phone. The support team is available 24/7 for assistance with any issues you may have."
                : language === "ru"
                ? "Для получения поддержки посетите страницу контактов Xstore. Вы можете связаться через чат, электронную почту или телефон. Команда поддержки работает круглосуточно и готова помочь с любыми проблемами."
                : "Dəstək üçün Xstore-un əlaqə səhifəsinə daxil olun. Canlı çat, e-poçt və ya telefon vasitəsilə əlaqə saxlaya bilərsiniz. Dəstək komandası 24/7 xidmətinizdədir, hər hansı bir probleminizlə kömək etməyə hazırdır."}
            </Accordion.Body>
          </Accordion.Item>

          <Accordion.Item eventKey="4">
            <Accordion.Header>
              {language === "en"
                ? "What are the payment methods on Xstore?"
                : language === "ru"
                ? "Какие способы оплаты доступны на Xstore?"
                : "Xstore-da hansı ödəniş üsulları mövcuddur?"}
            </Accordion.Header>
            <Accordion.Body>
              {language === "en"
                ? "Xstore accepts various payment methods including credit cards, debit cards, and PayPal. Choose your preferred payment method during checkout."
                : language === "ru"
                ? "Xstore принимает различные способы оплаты, включая кредитные карты, дебетовые карты и PayPal. Выберите предпочитаемый способ оплаты при оформлении заказа."
                : "Xstore müxtəlif ödəniş üsullarını qəbul edir, o cümlədən kredit kartları, debet kartları və PayPal. Ödəniş üsulunuzu seçin və ödəniş prosesi zamanı istifadə edin."}
            </Accordion.Body>
          </Accordion.Item>
        </Accordion>
      </div>
    </div>
  );
};

export default FAQPage;
