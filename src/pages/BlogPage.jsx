import React from "react";
import BlogPageCard from "../components/BlogPageCard";
import blog_card1 from "../assets/images/blog_card1.png";
import blog_card2 from "../assets/images/blog_card2.png";
import blog_card3 from "../assets/images/blog_card3.png";
import blog_card4 from "../assets/images/blog_card4.png";
import blog_card5 from "../assets/images/blog_card5.png";
import blog_card6 from "../assets/images/blog_card6.png";
import blog_card7 from "../assets/images/blog_card7.png";
import blog_card8 from "../assets/images/blog_card8.png";
import { Col, Container, Row } from "react-bootstrap";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Scrollbar, A11y } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faArrowRight } from "@fortawesome/free-solid-svg-icons";
import AnimatedTopHero from "../components/AnimatedTopHero";

const BlogPage = () => {
  return (
    <div className="page">
      <AnimatedTopHero page={"blog"} />
      <Container className="blog-page">
        <Row className="g-5">
          <Col sm={12} md={6} lg={6}>
            <BlogPageCard
              image={blog_card1}
              title={"Consectetur aliquet"}
              date={"February 17, 2016"}
              views={5212}
              messages={0}
              desc={
                "Lectus pretium ullamcorper maecenas vivamus taciti volutpat volutpat quam lacinia dapibus dis ullamcorper a a aenean netus accumsan. Donec a etiam ridiculus adipiscing a condimentum."
              }
            />
          </Col>
          <Col sm={12} md={6} lg={6}>
            <BlogPageCard
              image={blog_card2}
              title={"Consectetur vestibulum aliquet"}
              date={"February 17, 2016"}
              views={4532}
              messages={3}
              desc={
                "Lectus pretium ullamcorper maecenas vivamus taciti volutpat volutpat quam lacinia dapibus dis ullamcorper a a aenean netus accumsan. Donec a etiam ridiculus adipiscing a condimentum."
              }
            />
          </Col>
          <Col sm={12} md={6} lg={6}>
            <BlogPageCard
              image={blog_card3}
              title={"Dapibus etiam tellus"}
              date={"January 30, 2016"}
              views={2734}
              messages={16}
              desc={
                "Lectus pretium ullamcorper maecenas vivamus taciti volutpat volutpat quam lacinia dapibus dis ullamcorper a a aenean netus accumsan. Donec a etiam ridiculus adipiscing a condimentum."
              }
            />
          </Col>
          <Col sm={12} md={6} lg={6}>
            <BlogPageCard
              image={blog_card4}
              title={"Quote Post Example"}
              date={" January 16, 2016"}
              views={11871}
              messages={26}
              desc={
                "Lectus pretium ullamcorper maecenas vivamus taciti volutpat volutpat quam lacinia dapibus dis ullamcorper a a aenean netus accumsan. Donec a etiam ridiculus adipiscing a condimentum."
              }
            />
          </Col>
        </Row>
        <Swiper
          className="swiper-container"
          modules={[Navigation, Pagination, Scrollbar, A11y]}
          spaceBetween={50}
          slidesPerView={2}
          navigation
          pagination={{ clickable: true }}
          scrollbar={{ draggable: true }}
        >
          <SwiperSlide>
            <img src={blog_card5} alt="Blog Slide" />
          </SwiperSlide>
          <SwiperSlide>
            <img src={blog_card6} alt="Blog Slide" />
          </SwiperSlide>
          <SwiperSlide>
            <img src={blog_card7} alt="Blog Slide" />
          </SwiperSlide>
          <SwiperSlide>
            <img src={blog_card8} alt="Blog Slide" />
          </SwiperSlide>
        </Swiper>
        <Row>
          <Col sm={12} md={6} lg={6}>
            <BlogPageCard
              image={blog_card3}
              title={"Dapibus etiam tellus"}
              date={"January 30, 2016"}
              views={2734}
              messages={16}
              desc={
                "Lectus pretium ullamcorper maecenas vivamus taciti volutpat volutpat quam lacinia dapibus dis ullamcorper a a aenean netus accumsan. Donec a etiam ridiculus adipiscing a condimentum."
              }
            />
          </Col>
          <Col sm={12} md={6} lg={6}>
            <BlogPageCard
              image={blog_card4}
              title={"Quote Post Example"}
              date={" January 16, 2016"}
              views={11871}
              messages={26}
              desc={
                "Lectus pretium ullamcorper maecenas vivamus taciti volutpat volutpat quam lacinia dapibus dis ullamcorper a a aenean netus accumsan. Donec a etiam ridiculus adipiscing a condimentum."
              }
            />
          </Col>
        </Row>
        <Swiper
          className="swiper-container"
          modules={[Navigation, Pagination, Scrollbar, A11y]}
          spaceBetween={50}
          slidesPerView={2}
          navigation
          pagination={{ clickable: true }}
          scrollbar={{ draggable: true }}
        >
          <SwiperSlide>
            <img src={blog_card5} alt="Blog Slide" />
          </SwiperSlide>
          <SwiperSlide>
            <img src={blog_card6} alt="Blog Slide" />
          </SwiperSlide>
          <SwiperSlide>
            <img src={blog_card7} alt="Blog Slide" />
          </SwiperSlide>
          <SwiperSlide>
            <img src={blog_card8} alt="Blog Slide" />
          </SwiperSlide>
        </Swiper>
      </Container>
    </div>
  );
};

export default BlogPage;
