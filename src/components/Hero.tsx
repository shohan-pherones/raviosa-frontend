"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { fadeUp } from "../utils/motion";

const heroItems = [
  {
    id: 1,
    headline: "Glow Like Red Hot Aubrey Plaza",
    description:
      "Embrace your inner allure with the stunning Aubrey Plaza as our official ambassador. Unveil radiant skincare and makeup essentials that highlight your natural beauty and confidence, turning heads wherever you go.",
    image: "/images/hero-01.jpg",
  },
  {
    id: 2,
    headline: "Glow Like Never Before",
    description:
      "Discover radiant skincare and makeup essentials designed to bring out your natural beauty and confidence.",
    image: "/images/hero-02.jpg",
  },
  {
    id: 3,
    headline: "Where Beauty Meets Elegance",
    description:
      "Indulge in luxurious cosmetics crafted to enhance your features and define your unique style.",
    image: "/images/hero-03.jpg",
  },
  {
    id: 4,
    headline: "Your Skin Deserves the Best",
    description:
      "Pamper yourself with our curated collection of high-quality products for glowing, healthy skin.",
    image: "/images/hero-04.jpg",
  },
  {
    id: 5,
    headline: "Unveil Your True Beauty",
    description:
      "Transform your everyday look with our premium beauty and skincare collections, tailored for every occasion.",
    image: "/images/hero-05.jpg",
  },
  {
    id: 6,
    headline: "Timeless Beauty Awaits",
    description:
      "Experience the perfect blend of science and artistry with cosmetics designed to inspire and empower.",
    image: "/images/hero-06.jpg",
  },
];

const Hero = () => {
  return (
    <div className="h-[calc(100vh-4rem)]">
      <Swiper
        navigation={true}
        loop={true}
        grabCursor={true}
        pagination={{
          clickable: true,
        }}
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
        }}
        modules={[Navigation, Pagination, Autoplay]}
        className="h-full"
      >
        {heroItems.map((item) => (
          <SwiperSlide key={item.id}>
            <div
              className="hero h-full"
              style={{
                backgroundImage: `url(${item.image})`,
              }}
            >
              <div className="hero-overlay bg-opacity-60"></div>
              <div className="hero-content text-neutral-content text-center">
                <div className="max-w-md">
                  <div className="overflow-hidden">
                    <motion.h1
                      initial="hidden"
                      whileInView="visible"
                      variants={fadeUp()}
                      className="mb-5 text-5xl font-bold"
                    >
                      {item.headline}
                    </motion.h1>
                  </div>
                  <div className="overflow-hidden">
                    <motion.p
                      initial="hidden"
                      whileInView="visible"
                      variants={fadeUp(0.1)}
                      className="mb-5"
                    >
                      {item.description}
                    </motion.p>
                  </div>
                  <div className="overflow-hidden">
                    <motion.div
                      initial="hidden"
                      whileInView="visible"
                      variants={fadeUp(0.2)}
                    >
                      <Link href="/products" className="btn btn-primary">
                        Discover Premium Cosmetics
                      </Link>
                    </motion.div>
                  </div>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Hero;
