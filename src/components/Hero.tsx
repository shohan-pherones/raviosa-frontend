"use client";

import Link from "next/link";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

const heroItems = [
  {
    id: 1,
    headline: "Unleash Your Inner Goddess",
    description:
      "Drape yourself in elegance and let every curve tell a story of desire. Your confidence deserves this embrace.",
    image: "/images/hero-01.jpeg",
  },
  {
    id: 2,
    headline: "Where Silk Meets Sin",
    description:
      "Slide into the allure of luxurious fabrics designed to ignite passion and turn every glance into a lingering gaze.",
    image: "/images/hero-02.jpeg",
  },
  {
    id: 3,
    headline: "Sculpted for Seduction",
    description:
      "Feel the sensuality of designs that caress your body, capturing hearts and commanding attention with every step.",
    image: "/images/hero-03.jpeg",
  },
  {
    id: 4,
    headline: "Elegance Redefined",
    description:
      "Step into a world where sophistication and sensuality collide, creating moments that linger in memory.",
    image: "/images/hero-04.jpeg",
  },
  {
    id: 5,
    headline: "Lust in Every Stitch",
    description:
      "Experience the magic of designs crafted to tease and entice, leaving an unforgettable impression wherever you go.",
    image: "/images/hero-05.jpeg",
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
                  <h1 className="mb-5 text-5xl font-bold">{item.headline}</h1>
                  <p className="mb-5">{item.description}</p>
                  <Link href="/products" className="btn btn-primary">
                    Explore Classy Apparel
                  </Link>
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
