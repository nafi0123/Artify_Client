import React, { useEffect, useState } from "react";
import Banner from "../../components/Banner/Banner";
import { useAxios } from "../../hooks/useAxios";
import Loading from "../../components/Loading/Loading";
import SingleCard from "../../components/SingleCard/SingleCard";
import { Fade, Slide } from "react-awesome-reveal";
import AOS from "aos";
import "aos/dist/aos.css";



const Home = () => {
  const axiosInstance = useAxios();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axiosInstance
      .get("artworks-recent")
      .then((res) => {
        setData(res.data);
        setLoading(false);
      })
      
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
      AOS.init({
      duration: 1000,
      once: false,
      offset: 120,
    });
  }, []);

  if (loading) return <Loading />;

  return (
    <div className=" ">

      {/* Banner Section */}
     
        <Banner />
  

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 my-16">

        {/* Heading */}
        <Fade cascade damping={0.2} triggerOnce>
          <div className="text-center mb-10" data-aos="fade-up">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-3">
              🎨 Discover Inspiring <span className="text-[#137A63]">Artworks</span>
            </h1>
            <p className="text-gray-600 text-sm sm:text-base max-w-2xl mx-auto">
              Explore galleries from talented artists around the world. Upload your own creations, curate favorites, and connect through appreciation and collaboration.
            </p>
          </div>
        </Fade>

        {/* Art Cards Grid */}
        <Fade cascade damping={0.2} triggerOnce>
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {data?.map((art) => (
              <SingleCard art={art} aos="fade-up"key={art._id}  />
            ))}
          </div>
        </Fade>

      </div>
    </div>
  );
};

export default Home;
