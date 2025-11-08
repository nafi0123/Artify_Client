import React from "react";
import { Outlet, useNavigation } from "react-router";
import Navbar from "../components/Navbar/Navbar";
import Footer from "../components/Footer/Footer";
import Loading from "../components/Loading/Loading";

const Root = () => {
      const { state } = useNavigation;
  return (
    <div className="bg-base-200 min-h-screen">
      <header className="">
        <Navbar></Navbar>
      </header>

      {/* className="w-11/12 mx-auto py-5" */}
      <main >
        {state == "loading" ? <Loading></Loading> : <Outlet></Outlet>}
      
      </main>
      <footer className="py-4">
        <Footer></Footer>
      </footer>
    </div>
  );
};

export default Root;
