import { createBrowserRouter } from "react-router";
import Root from "../layouts/Root";
import Home from "../pages/Home/Home";
import Register from "../pages/Register/Register";
import Login from "../pages/Login/Login";
import ForgotPass from "../pages/ForgotPass/ForgotPass";
import Viewdetails from "../pages/Viewdetails/Viewdetails";
import Loading from "../components/Loading/Loading";

import ExploreArtworks from "../pages/ExploreArtworks/ExploreArtworks";
import PrivetProvider from "../provider/PrivetProvider";
import ErrorPage from "../pages/ErrorPage/ErrorPage";
import AboutUs from "../pages/AboutUs/AboutUs";
import AddArtwork from "../pages/Dashboard/AddArtwork/AddArtwork";
import MyGallery from "../pages/Dashboard/MyGallery/MyGallery";
import MyFavorites from "../pages/Dashboard/MyFavorites/MyFavorites";
import DashboardLayout from "../layouts/DashboardLayout";
import MyProfile from "../pages/SharedPages/MyProfile/MyProfile";
import DashboardChart from "../pages/Dashboard/DashboardChart/DashboardChart";
const router = createBrowserRouter([
  {
    path: "/",
    Component: Root,
    errorElement: <ErrorPage></ErrorPage>,
    children: [
      { index: true, Component: Home },
      {
        path: "/register",
        Component: Register,
      },
      {
        path: "/login",
        Component: Login,
      },
      {
        path: "/forgot-password",
        Component: ForgotPass,
      },
      {
        path: "/detail-card/:id",
        loader: ({ params }) =>
          fetch(
            `https://artify-api-amber.vercel.app/artwork-details/${params.id}`
          ),
        element: <Viewdetails></Viewdetails>,
        hydrateFallbackElement: <Loading></Loading>,
      },

      {
        path: "/explore-artworks",
        Component: ExploreArtworks,
      },
      {
        path: "/about-us",
        Component: AboutUs,
      },
      {
        path: "profile",
        element: (
          <PrivetProvider>
            <MyProfile></MyProfile>
          </PrivetProvider>
        ),
      },
    ],
  },

  {
    path: "dashboard",

    element: (
      <PrivetProvider>
        <DashboardLayout />
      </PrivetProvider>
    ),
    errorElement: <ErrorPage></ErrorPage>,
    children: [
      {
        path: "favorites",

        element: <MyFavorites></MyFavorites>,
      
      },
      {
        path: "add-artwork",
        element: <AddArtwork></AddArtwork>,
       
      },
      {
        path: "my-gallery",
        element: <MyGallery></MyGallery>,
      },
      {
        path: "profile",
        element: <MyProfile></MyProfile>,
      },
      {
        path: "artworks-stats",

        element: <DashboardChart></DashboardChart>,
     
      },
    ],
  },
]);

export default router;
