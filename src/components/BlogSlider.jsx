import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import blog_card1 from "../assets/images/blog_card1.png";
import blog_card2 from "../assets/images/blog_card2.png";
import blog_card3 from "../assets/images/blog_card3.png";
import blog_card4 from "../assets/images/blog_card4.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendarDays } from "@fortawesome/free-solid-svg-icons"; // Correct import for the calendar icon
import { faMessage } from "@fortawesome/free-solid-svg-icons/faMessage";
import { Link, useNavigate } from "react-router-dom";

const BlogSlider = () => {
  const navigate = useNavigate();

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
            <h3>Consectetur aliquet</h3>
            <h1>
              <FontAwesomeIcon icon={faCalendarDays} />
              February 17, 2016
              <FontAwesomeIcon icon={faMessage} />
              <span>0</span>
            </h1>
            <p>
              Lectus pretium ullamcorper maecenas vivamus taciti volutpat
              volutpat quam lacinia dapibus dis ullamcorper a a aenean netus
              accumsan. Donec a etiam ridiculus adipiscing a condimentum.
            </p>
            <Link to={"/blog"} className="blog-card-link">
              Continue Reading <span>{">"}</span>
            </Link>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="blog-card">
            <img src={blog_card2} alt="Blog 2" />
            <h3>Consectetur aliquet</h3>
            <h1>
              <FontAwesomeIcon icon={faCalendarDays} />
              February 17, 2016
              <FontAwesomeIcon icon={faMessage} />
              <span>0</span>
            </h1>
            <p>
              Lectus pretium ullamcorper maecenas vivamus taciti volutpat
              volutpat quam lacinia dapibus dis ullamcorper a a aenean netus
              accumsan. Donec a etiam ridiculus adipiscing a condimentum.
            </p>
            <Link to={"/blog"} className="blog-card-link">
              Continue Reading <span>{">"}</span>
            </Link>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="blog-card">
            <img src={blog_card3} alt="Blog 3" />
            <h3>Consectetur aliquet</h3>
            <h1>
              <FontAwesomeIcon icon={faCalendarDays} />
              February 17, 2016
              <FontAwesomeIcon icon={faMessage} />
              <span>0</span>
            </h1>
            <p>
              Lectus pretium ullamcorper maecenas vivamus taciti volutpat
              volutpat quam lacinia dapibus dis ullamcorper a a aenean netus
              accumsan. Donec a etiam ridiculus adipiscing a condimentum.
            </p>
            <Link to={"/blog"} className="blog-card-link">
              Continue Reading <span>{">"}</span>
            </Link>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="blog-card">
            <img src={blog_card4} alt="Blog 4" />
            <h3>Consectetur aliquet</h3>
            <h1>
              <FontAwesomeIcon icon={faCalendarDays} />
              February 17, 2016
              <FontAwesomeIcon icon={faMessage} />
              <span>0</span>
            </h1>
            <p>
              Lectus pretium ullamcorper maecenas vivamus taciti volutpat
              volutpat quam lacinia dapibus dis ullamcorper a a aenean netus
              accumsan. Donec a etiam ridiculus adipiscing a condimentum.
            </p>
            <Link to={"/blog"} className="blog-card-link">
              Continue Reading <span>{">"}</span>
            </Link>
          </div>
        </SwiperSlide>
      </Swiper>
    </div>
  );
};

export default BlogSlider;
