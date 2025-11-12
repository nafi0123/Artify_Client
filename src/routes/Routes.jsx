import { createBrowserRouter } from "react-router";
import Root from "../layouts/Root";
import Home from "../pages/Home/Home";
import Register from "../pages/Register/Register";
import Login from "../pages/Login/Login";
import ForgotPass from "../pages/ForgotPass/ForgotPass";
import Viewdetails from "../pages/Viewdetails/Viewdetails";
import Loading from "../components/Loading/Loading";
import MyFavorites from "../pages/MyFavorites/MyFavorites";
import AddArtwork from "../pages/AddArtwork/AddArtwork";
import MyGallery from "../pages/MyGallery/MyGallery";
import ExploreArtworks from "../pages/ExploreArtworks/ExploreArtworks";
const router = createBrowserRouter([
  {
    path: "/",
    Component: Root,
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
        Component: Viewdetails,
        hydrateFallbackElement: <Loading></Loading>,
      },
      {
        path: "/favorites",
        Component: MyFavorites,
      },
      {
        path: "/add-artwork",
        Component: AddArtwork,
      },
      {
        path: "/my-gallery",
        Component: MyGallery,
      },
      {
        path: "/explore-artworks",
        Component: ExploreArtworks,
      },
    ],
  },
]);

export default router;
