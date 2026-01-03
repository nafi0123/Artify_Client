import React, { useEffect, useState } from "react";
import { Bar, Pie, Doughnut, Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from "chart.js";
import { useAxios } from "../../../hooks/useAxios";
import Loading from "../../../components/Loading/Loading";
import { Image, Heart, User, LayoutGrid } from "lucide-react";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

const DashboardChart = () => {
  const axiosInstance = useAxios();
  const [artworks, setArtworks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axiosInstance
      .get("/artworks-stats")
      .then((res) => setArtworks(res.data))
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, [axiosInstance]);

  if (loading) return <Loading />;

  const mainCategories = ["Painting", "Photography", "Digital Art"];
  const publicArts = artworks.filter((a) => a.visibility === "Public");
  
  const counts = {
    Painting: publicArts.filter((a) => a.category === "Painting").length,
    Photography: publicArts.filter((a) => a.category === "Photography").length,
    "Digital Art": publicArts.filter((a) => a.category === "Digital Art").length,
    Others: publicArts.filter((a) => !mainCategories.includes(a.category)).length,
  };

  const totalLikes = artworks.reduce((acc, curr) => acc + (curr.likes || 0), 0);
  const chartColors = ["#137A63", "#2D6A4F", "#52B788", "#95D5B2", "#D8F3DC"];


  const barData = {
    labels: Object.keys(counts),
    datasets: [{ label: "Artworks", data: Object.values(counts), backgroundColor: chartColors, borderRadius: 5 }],
  };

  const doughnutData = {
    labels: Object.keys(counts),
    datasets: [{ data: Object.values(counts), backgroundColor: chartColors }],
  };

  const lineData = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
    datasets: [{ label: "Likes", data: [12, 19, 15, 25, 22, 30], borderColor: "#137A63", tension: 0.4 }],
  };

  return (
    <div className="w-full max-w-7xl mx-auto py-10 px-4 bg-transparent">
      {/* Title Section */}
      <div className="text-center mb-10">
        <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-white">
          Artworks <span className="text-[#137A63]">Statistics</span>
        </h2>
        <p className="text-gray-500 dark:text-gray-400 mt-2">📊 Analytics Dashboard #137A-js</p>
      </div>

  
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <StatCard icon={<LayoutGrid size={20}/>} title="Total Artworks" value={artworks.length} />
        <StatCard icon={<Image size={20}/>} title="Public Assets" value={publicArts.length} />
        <StatCard icon={<Heart size={20}/>} title="Total Likes" value={totalLikes} />
        <StatCard icon={<User size={20}/>} title="Top Category" value="Painting" />
      </div>

 
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <ChartBox title="Public Artworks by Category">
          <Bar data={barData} options={{ responsive: true }} />
        </ChartBox>

        <ChartBox title="Category Distribution">
          <div className="max-w-[280px] mx-auto">
            <Pie data={doughnutData} />
          </div>
        </ChartBox>

        <ChartBox title="Average Monthly Likes">
          <Line data={lineData} />
        </ChartBox>

        <ChartBox title="Engagement Ratio">
          <div className="max-w-[280px] mx-auto">
            <Doughnut data={doughnutData} options={{ cutout: "70%" }} />
          </div>
        </ChartBox>
      </div>
    </div>
  );
};


const StatCard = ({ icon, title, value }) => (
  <div className="bg-white dark:bg-gray-800 p-5 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 flex items-center gap-4 transition-colors">
    <div className="p-3 bg-[#137A63]/10 text-[#137A63] rounded-lg">
      {icon}
    </div>
    <div>
      <p className="text-xs text-gray-500 dark:text-gray-400 uppercase font-semibold">{title}</p>
      <p className="text-xl font-bold text-gray-900 dark:text-white">{value}</p>
    </div>
  </div>
);


const ChartBox = ({ title, children }) => (
  <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 transition-colors">
    <h3 className="text-lg font-bold mb-6 text-center text-gray-800 dark:text-gray-100 italic">
      {title}
    </h3>
    {children}
  </div>
);

export default DashboardChart;