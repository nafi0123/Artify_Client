import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Link } from "react-router";

const Banner = () => {
  const slides = [
    {
      id: 1,
      img: "https://i.ibb.co.com/G4w44hbK/b-7.jpg",
      title: "Discover & Showcase Your Creativity",
      desc: "Upload your artworks, build your gallery, and share your imagination with the world.",
      button: "Explore Artworks",
      link: "/explore-artworks",
    },
    {
      id: 2,
      img: "https://i.ibb.co.com/3mL2TgW1/birmingham-museums-trust-p-WVJHDi-Aon-U-unsplash.jpg",
      title: "Explore Inspiring Art from Artists Worldwide",
      desc: "Dive into a vibrant community of creators and explore breathtaking digital masterpieces.",
      button: "View Gallery",
      link: "/my-gallery",
    },
    {
      id: 3,
      img: "https://i.ibb.co.com/SDF5VQJs/birmingham-museums-trust-5-EUh-tq31e-A-unsplash.jpg",
      title: "Connect, Appreciate & Collaborate",
      desc: "Like, comment, and collaborate with fellow art lovers. Let creativity bring us together.",
      button: "Join Now",
      link: "/login",
    },
  ];

  return (
    <section className="w-full overflow-hidden">
      <Swiper
        spaceBetween={30}
        centeredSlides
        autoplay={{ delay: 4000, disableOnInteraction: false }}
        pagination={{ clickable: true }}
        navigation
        modules={[Autoplay, Pagination, Navigation]}
        className="w-full"
      >
        {slides.map((slide) => (
          <SwiperSlide key={slide.id}>
            <div className="relative w-full h-[60vh] md:h-[65vh] lg:h-[70vh]">

              {/* ✅ Image with object-cover */}
              <img
                src={slide.img}
                alt={slide.title}
                className="absolute inset-0 w-full h-full object-cover"
              />

              {/* Overlay */}
              <div className="absolute inset-0 bg-black/50"></div>

              {/* Content */}
              <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-4 max-w-3xl mx-auto">
                <h2 className="text-2xl sm:text-3xl md:text-5xl font-bold mb-4 text-white">
                  {slide.title}
                </h2>

                <p className="text-sm sm:text-base md:text-lg mb-6 text-white leading-relaxed">
                  {slide.desc}
                </p>

                <Link
                  to={slide.link}
                  className="inline-block bg-[#137A63] hover:bg-[#0f5d4c]
                             text-white font-semibold px-6 py-3
                             rounded-full transition duration-300"
                >
                  {slide.button}
                </Link>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
};

export default Banner;
