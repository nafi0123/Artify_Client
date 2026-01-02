import React from "react";
import { Outlet, useNavigation } from "react-router";
import Navbar from "../components/Navbar/Navbar";
import Footer from "../components/Footer/Footer";
import Loading from "../components/Loading/Loading";

const Root = () => {
      const { state } = useNavigation;
  return (
    // bg-[#fdfaf6]
    // dark:bg-black dark:text-white bg-white
    <div className="min-h-screen bg-[#fdfaf6]  dark:bg-gray-900 text-gray-900">
      <header className="sticky top-0 z-50">
        <Navbar></Navbar>
      </header>

      {/* className="w-11/12 mx-auto py-5" */}
      <main >
        {state == "loading" ? <Loading></Loading> : <Outlet></Outlet>}
      
      </main>
      <footer className="">
        <Footer></Footer>
      </footer>
    </div>
  );
};

export default Root;
