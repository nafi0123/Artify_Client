import { createBrowserRouter } from "react-router";
import Root from "../layouts/Root";
import Home from "../pages/Home/Home";
import Register from "../pages/Register/Register";
import Login from "../pages/Login/Login";
import ForgotPass from "../pages/ForgotPass/ForgotPass";
import Viewdetails from "../pages/Viewdetails/Viewdetails";
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
          fetch(`http://localhost:5000/artwork-details/${params.id}`),
        Component: Viewdetails,
      },
    ],
  },
]);

export default router;
