import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

const Banner = () => {
  // 

const slides = [
  {
    id: 1,
    img: "https://i.ibb.co.com/G4w44hbK/b-7.jpg", 
    title: "Discover & Showcase Your Creativity",
    desc: "Upload your artworks, build your gallery, and share your imagination with the world.",
    button: "Explore Artworks",
  },
  {
    id: 2,
    img: "https://i.ibb.co.com/3mL2TgW1/birmingham-museums-trust-p-WVJHDi-Aon-U-unsplash.jpg", 
    title: "Explore Inspiring Art from Artists Worldwide",
    desc: "Dive into a vibrant community of creators and explore breathtaking digital masterpieces.",
    button: "View Gallery",
  },
  {
    id: 3,
    img: "https://i.ibb.co.com/SDF5VQJs/birmingham-museums-trust-5-EUh-tq31e-A-unsplash.jpg", 
    title: "Connect, Appreciate & Collaborate",
    desc: "Like, comment, and collaborate with fellow art lovers. Let creativity bring us together.",
    button: "Join Now",
  },
];

;

  return (
    <section className="w-full h-[80vh] md:h-[90vh] mt-2">
      <Swiper
        spaceBetween={30}
        centeredSlides={true}
        autoplay={{
          delay: 4000,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
        }}
        navigation={true}
        modules={[Autoplay, Pagination, Navigation]}
        className="h-full w-full rounded-xl shadow-lg"
      >
        {slides.map((slide) => (
          <SwiperSlide key={slide.id}>
            <div
              className="h-full bg-cover bg-center flex flex-col justify-center items-center text-white"
              style={{
                backgroundImage: `url(${slide.img})`,
              }}
            >
              <div className="bg-black/50 p-6 rounded-xl text-center max-w-2xl">
                <h2 className="text-4xl md:text-6xl font-bold mb-4">
                  {slide.title}
                </h2>
                <p className="text-lg mb-4">{slide.desc}</p>
                <button className="bg-[#137A63] hover:bg-[#0f5d4c] text-white font-semibold px-6 py-3 rounded-full transition duration-300">
                  {slide.button}
                </button>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
};

export default Banner;
