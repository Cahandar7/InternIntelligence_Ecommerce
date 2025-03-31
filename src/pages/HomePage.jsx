import React from "react";
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

const HomePage = () => {
  const products = useSelector((p) => p);

  return (
    <div className="page">
      <HomeBanner />

      <div className="shine-cards">
        <div style={{ textAlign: "left", paddingLeft: "13px" }}>
          <img src={shine_img1} alt="shine_img1" />
          <p>ACCESSORIES</p>
          <h2> NEW GATEWAY</h2>
          <h2>GOLD WATCH</h2>
        </div>
        <div style={{ textAlign: "center" }}>
          <img src={shine_img2} alt="shine_img2" />
          <p>ACCESSORIES</p>
          <h1>SPRING</h1>
          <h2>2016 IS COMING</h2>
        </div>
        <div style={{ textAlign: "right", paddingRight: "13px" }}>
          <img src={shine_img3} alt="shine_img3" />
          <p>ACCESSORIES</p>
          <h2> NEW GATEWAY</h2>
          <h2>GOLD WATCH</h2>
        </div>
      </div>

      <div className="products-slider-container">
        <div className="texts">
          <h1>TOP INTERESTING</h1>
          <p>
            Browse the collection of our dark best selling and top interesting
            products. You’ll definitely find what you are looking for.
          </p>
        </div>
        <Swiper
          style={{ width: "70%" }}
          spaceBetween={0}
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
          {products
            .filter((el) => el.rating > 9)
            .map((item, index) => {
              return (
                <SwiperSlide>
                  <ProductCard
                    key={index}
                    image={item.image}
                    title={item.title}
                    category={item.category}
                    brand={item.brand}
                    price={item.price}
                    alldata={item}
                  />
                </SwiperSlide>
              );
            })}
        </Swiper>
      </div>

      <Marquee
        speed={100}
        gradient={false}
        pauseOnHover={false}
        className="strip-container"
      >
        Welcome to Xstore - Your One-Stop Shop! Free Shipping Over $50!
        Exclusive Deals Available Now! Trusted by Thousands! New Arrivals Every
        Week!
      </Marquee>

      <div className="texts-section">
        <div className="first">
          <h2>.01</h2>
          <h3>MAKE YOUR ORDER</h3>
          <p>
            Scelerisque senectus sem sem viverra quam dictumst hac congue
            pretium metus mi ut auctor laoreet.
          </p>
          <Link to={"/about"}>READ MORE</Link>
        </div>
        <div className="second">
          <h2>.02</h2>
          <h3>PAYMENT PROCESS</h3>
          <p>
            Choose the most appropriative payment method.Be sure to be incognito
            and secure with your details.
          </p>
          <Link to={"/about"}>READ MORE</Link>
        </div>
        <div className="third">
          <h2>.03</h2>
          <h3>24H UK DELIVERY</h3>
          <p>
            Vestibulum eleifend sodales a a nam fermentum vitae non a a cum
            cubilia adipiscing throughout the world.
          </p>
          <Link to={"/about"}>READ MORE</Link>
        </div>
      </div>

      <div className="blog-slider-container">
        <div className="texts">
          <h1>LATEST FROM OUR BLOG</h1>
          <p>
            Dapibus montes cras netus ullamcorper purus varius morbi diam dolor
            vestibulum nascetur nam. Focus on the latest news in our blog!
          </p>
        </div>
        <BlogSlider />
      </div>
    </div>
  );
};

export default HomePage;
